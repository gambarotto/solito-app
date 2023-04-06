import { Button, IButtonProps } from "native-base";

type ButtonBaseProps = IButtonProps & {
  text: string;
}

export function ButtonBase ({ text, ...rest }: ButtonBaseProps) {
  return (
    <Button
      isLoading={false}
      spinnerPlacement="end"
      isLoadingText="Fazendo login..."
      backgroundColor="blue.900"
      w="300px"
      size="lg"
      bgColor="blue.600"
      _loading={{
        bg: 'green.500',
        _text: {
          color: 'green.900',
        },
      }}
      {...rest}
    >
      {text}
    </Button>
  )
}