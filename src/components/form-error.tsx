import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
	message?: string;
};

export const FormError = ({message}: FormErrorProps) => {
	if (!message) return null;

	return(
		<div className="bg-destructive/15 flex items-center p-3 justify-start gap-2 text-destructive rounded-lg text-sm">
			<ExclamationTriangleIcon className="h-4 w-4"/>
			<p>{message}</p>
		</div>
	)
}