import { FormControl, IInputProps, Input, WarningOutlineIcon } from "native-base";

type InputBaseProps = IInputProps & {
  label: string;
  placeholder: string;
  isError?: boolean;
  textError?: string;
  type: string;
}

export function InputBase({ 
  label, 
  placeholder, 
  textError, 
  type,
  isError = false,
  ...rest
}: InputBaseProps) {
  return (
    <FormControl
      isInvalid={isError}
      w="100%"
      maxW="300px"
      justifyContent="center"
      alignItems="center"
    >
      <FormControl.Label alignSelf="flex-start">{label}</FormControl.Label>
      <Input
        w={{
          base: '100%',
          md: '100%',
        }}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {isError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {textError}
      </FormControl.ErrorMessage>}
    </FormControl>
  )
}