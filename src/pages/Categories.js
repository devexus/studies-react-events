import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { useStore } from "../context/storeContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CategoryForm from "../components/CategoryModal/CategoryForm";
import update from "immutability-helper";

const Categories = () => {
  const { categories, setCategories } = useStore();
  const [modal, setModal] = useState();

  const onSubmit = (values) => {
    if (values.id == null) {
      const id = uuidv4();

      setCategories((c) => [
        ...c,
        { id, name: values.name, color: values.color },
      ]);
    } else {
      setCategories((c) => {
        const index = c.findIndex((el) => el.id === values.id);

        return update(c, {
          [index]: { $merge: { name: values.name, color: values.color } },
        });
      });
    }
    setModal(undefined);
  };

  const onDelete = (id) => {
    setCategories((c) => {
      const index = c.findIndex((el) => el.id === id);

      return update(c, { $splice: [[index, 1]] });
    });
  };

  return (
    <Box mt={20}>
      <Flex
        bg="white"
        p={5}
        borderRadius={5}
        justifyContent="space-between"
        shadow="md"
        alignItems="center"
      >
        <Text fontSize="large">Categories</Text>
        <Button
          onClick={() => {
            setModal({ title: "Add new category" });
          }}
        >
          Add new category
        </Button>
      </Flex>

      <Box mt={5} bg="white" borderRadius={5} shadow="md">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Color</Th>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((el) => (
                <Tr key={el.id}>
                  <Td>
                    <Box
                      w="20px"
                      height="20px"
                      bgColor={el.color}
                      border={"2px solid #959595"}
                      borderRadius="50%"
                    ></Box>
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() =>
                          setModal({
                            title: "Edit category",
                            defaultValues: el,
                          })
                        }
                      />
                      <IconButton
                        onClick={() => onDelete(el.id)}
                        colorScheme="red"
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={!!modal} onClose={() => setModal(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CategoryForm
              defaultValues={modal?.defaultValues ?? {}}
              onSubmit={onSubmit}
              onClose={() => setModal(undefined)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Categories;
