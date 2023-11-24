import {
  FormControl,
  Input,
  Textarea,
  FormLabel,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useStore } from "../../context/storeContext";
import { Select } from "chakra-react-select";
import { Controller } from "react-hook-form";

const EventForm = ({ defaultValues, onSubmit, onClose }) => {
  const { register, handleSubmit, control } = useForm({ defaultValues });

  const { categories } = useStore();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input {...register("title")} type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea {...register("description")} size="sm" />
      </FormControl>

      <FormControl>
        <FormLabel>Date start</FormLabel>
        <Input {...register("startDate")} type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>Date end</FormLabel>
        <Input {...register("endDate")} type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>Image url</FormLabel>
        <Input {...register("url")} type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              colorScheme="purple"
              options={categories.map((el) => ({
                label: el.name,
                value: el.id,
              }))}
            />
          )}
        />
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

export default EventForm;
