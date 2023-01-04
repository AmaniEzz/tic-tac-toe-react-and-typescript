type SqaureProps = {
  onClick(): void;
  value: string | undefined;
};

export function Square(props: SqaureProps) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
