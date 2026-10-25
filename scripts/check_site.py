"""Check static-site paths and HTML integrity without third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
VOID_TAGS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
             'meta', 'param', 'source', 'track', 'wbr'}


def local_path(url, source):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    path = unquote(parsed.path)
    return ROOT / path.lstrip('/') if path.startswith('/') else source.parent / path


class SiteHTML(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source
        self.ids = set()
        self.anchors = []
        self.stack = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in VOID_TAGS:
            self.stack.append(tag)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID: {attrs["id"]}'
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            url = attrs.get(attr, '')
            if url.startswith('#') and len(url) > 1:
                self.anchors.append(unquote(url[1:]))
            target = local_path(url, self.source)
            if target is not None:
                assert target.exists(), f'{self.source.name}: missing asset {url}'

    def handle_endtag(self, tag):
        if tag in VOID_TAGS:
            return
        assert self.stack and self.stack[-1] == tag, (
            f'{self.source.name}:{self.getpos()[0]} mismatched </{tag}>'
        )
        self.stack.pop()

    def verify(self):
        self.feed(self.source.read_text())
        assert not self.stack, f'Unclosed tags: {self.stack}'
        assert all(anchor in self.ids for anchor in self.anchors), 'Missing section anchor'


def main():
    for source in (ROOT / 'index.html', ROOT / 'admin/index.html'):
        SiteHTML(source).verify()
    for source in (ROOT / 'assets').rglob('*.css'):
        for url in re.findall(r'url\(\s*[\'"]?([^\)\'"\s]+)', source.read_text()):
            target = local_path(url, source)
            if target is not None:
                assert target.is_file(), f'{source.name}: missing CSS asset {url}'
    config = (ROOT / 'admin/config.yml').read_text()
    assert 'media_folder: "assets/images/uploads"' in config
    assert 'public_folder: "/assets/images/uploads"' in config
    print('Passed: HTML nesting, unique IDs, section anchors, local assets, CSS fonts and CMS upload paths.')


if __name__ == '__main__':
    main()
