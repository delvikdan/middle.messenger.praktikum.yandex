import Block from "@/framework/Block";
import { Link, type LinkProps } from "@/components/Link";

type FooterProps = {
  linksData: LinkProps[];
  activePage?: string;
};

export class Footer extends Block {
  constructor(props: FooterProps) {
    const links: Link[] = props.linksData.map(
      (linkData: LinkProps) =>
        new Link({
          ...linkData,
          isActive: props?.activePage === linkData.key,
        })
    );

    super({
      links,
    });
  }

  override render(): string {
    return `
    <footer class="footer">
      <nav class="footer__navigation">
        {{{ links }}}
      </nav>
    </footer>`;
  }
}
