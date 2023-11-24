import { FormControl, Input, FormLabel, Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CategoryForm = ({ defaultValues, onSubmit, onClose }) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Input {...register("color")} type="text" />
      </FormControl>
      <Flex mt={2} gap={2} justifyContent="flex-end">
        <Button type="submit" colorScheme="blue">
          Confirm
        </Button>
        <Button onClick={onClose}>Close</Button>
      </Flex>
    </form>
  );
};

export default CategoryForm;
