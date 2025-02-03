import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"

type FormInputProps = {
    form: any,
    name: string,
    label: string,
    type: string,
    disabled?: boolean
}
export function FormInput({ form, name, label, type, disabled }: FormInputProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} {...field} className="max-w-[300px]" disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}