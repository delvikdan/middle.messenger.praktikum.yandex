import Block from "@/framework/Block";
import { FormRow, type FormRowProps } from "@/components/Form/FormRow";
import { Button, type ButtonProps } from "@/components/Button";

export type FormProps = {
  className: string;
  formRowsData: FormRowProps[];
  buttonData: ButtonProps;
};

export class Form extends Block {
  formRows: FormRow[];

  constructor(props: FormProps) {
    const { formRowsData, buttonData } = props;
    const formRows: FormRow[] = formRowsData.map(
      (rowProps: FormRowProps) =>
        new FormRow({ ...rowProps, className: props.className })
    );

    const button: Button = new Button({
      ...buttonData,
      className: "btn-text",
      typeAttr: "sumbit",
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.submitForm();
      },
    });

    const formClass: string = props.className;

    super({ formClass, formRows, button });
    this.formRows = formRows;
  }

  submitForm(): void {
    let valid: boolean = true;
    this.formRows.forEach((row: FormRow) => {
      const error: string | null = row.showError();
      if (error) valid = false;
    });

    if (valid) {
      const data: Record<string, string> = {};
      this.formRows.forEach((row: FormRow) => {
        data[row.key] = row.input.getValue();
      });
      console.log("[VALIDATED FORM VALUES]", data);
    }
  }

  override render(): string {
    return `
     <form class="{{formClass}}" action="#">
        <div class="{{formClass}}__rows">
          {{{formRows}}}
        </div>
        <div class="{{formClass}}__submit">
          {{{button}}}
        </div>
      </form>`;
  }
}
