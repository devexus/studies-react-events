import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import update from "immutability-helper";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EventForm from "../components/EventModal/EventForm";
import { useStore } from "../context/storeContext";

const Events = () => {
  const { events, categories, setEvents } = useStore();
  const [modal, setModal] = useState();

  const onSubmit = (values) => {
    if (values.id == null) {
      const id = uuidv4();
      setEvents((e) => [
        ...e,
        {
          id,
          title: values.title,
          description: values.description,
          url: values.url,
          startDate: values.startDate,
          endDate: values.endDate,
          categoryId: values.category.value,
        },
      ]);
    } else {
      setEvents((e) => {
        const index = e.findIndex((el) => el.id === values.id);
        return update(e, {
          [index]: {
            $merge: {
              title: values.title,
              description: values.description,
              url: values.url,
              startDate: values.startDate,
              endDate: values.endDate,
              categoryId: values.category.value,
            },
          },
        });
      });
    }
    setModal(undefined);
  };

  const onDelete = (id) => {
    setEvents((e) => {
      const index = e.findIndex((el) => el.id === id);
      return update(e, { $splice: [[index, 1]] });
    });
  };

  const combinedData = events.map((el) => {
    const category = categories.find((c) => el.categoryId === c.id);

    return {
      ...el,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color,
    };
  });

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
        <Text fontSize="large">Events</Text>
        <Button
          onClick={() => {
            setModal({ title: "Add new event" });
          }}
        >
          Add new event
        </Button>
      </Flex>

      <Box mt={5} bg="white" borderRadius={5} shadow="md">
        <TableContainer whiteSpace="normal">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Date start</Th>
                <Th>Date end</Th>
                <Th>Image url</Th>
                <Th>Category name</Th>
                <Th>Category color</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {combinedData.map((el) => (
                <Tr key={el.id} verticalAlign="top">
                  <Td>{el.title}</Td>
                  <Td>{el.description}</Td>
                  <Td>{el.startDate}</Td>
                  <Td>{el.endDate}</Td>
                  <Td>
                    <a href={el.url}>link</a>
                  </Td>
                  <Td>{el.categoryName}</Td>
                  <Td>
                    <Box
                      w="20px"
                      height="20px"
                      bgColor={el.categoryColor}
                      border={"2px solid #959595"}
                      borderRadius="50%"
                    ></Box>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() =>
                          setModal({
                            title: "Edit event",
                            defaultValues: {
                              id: el.id,
                              title: el.title,
                              description: el.description,
                              startDate: el.startDate,
                              endDate: el.endDate,
                              url: el.url,
                              category: {
                                label: el.categoryName,
                                value: el.categoryId,
                              },
                            },
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
            <EventForm
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

export default Events;
