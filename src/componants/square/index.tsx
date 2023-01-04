type SquareProps = {
  onClick(): void;
  value: string | undefined;
};

export function Square(props: SquareProps) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
