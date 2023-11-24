import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import moment from "moment";
import { useState } from "react";
import { useStore } from "../context/storeContext";

const FILTER_OPTIONS = [
  {
    value: "title",
    label: "Title",
  },
  {
    value: "description",
    label: "Description",
  },
  {
    value: "startDate",
    label: "Date start",
  },
  {
    value: "endDate",
    label: "Date end",
  },
  {
    value: "categoryName",
    label: "Category",
  },
];

const Home = () => {
  const [filter, setFilter] = useState(FILTER_OPTIONS[0]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { events, categories } = useStore();

  const combinedData = events.map((el) => {
    const category = categories.find((c) => el.categoryId === c.id);

    return {
      ...el,
      categoryId: category.id,
      categoryName: category.name,
      categoryColor: category.color,
    };
  });

  combinedData.sort((a, b) => {
    if (filter === "startDate" || filter === "endDate") {
      return moment(a[filter.value]).diff(b[filter.value]);
    }

    return a[filter.value].localeCompare(b[filter.value]);
  });

  const filteredData = combinedData.filter((el) => {
    if (dateFrom !== "" && dateTo !== "") {
      return (
        moment(dateFrom).isBefore(moment(el.startDate)) &&
        moment(dateTo).isAfter(moment(el.endDate))
      );
    } else if (dateFrom !== "") {
      return moment(dateFrom).isBefore(moment(el.startDate));
    } else if (dateTo !== "") {
      return moment(dateTo).isAfter(moment(el.endDate));
    }

    return el;
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
        <Text fontSize="x-large">Timeline</Text>
        <Flex gap={4} alignItems="center">
          <Flex gap={2}>
            <FormControl>
              <FormLabel>Date from</FormLabel>
              <Flex>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
                {dateFrom ? (
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => setDateFrom("")}
                  />
                ) : null}
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Date to</FormLabel>
              <Flex>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
                {dateTo ? (
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => setDateTo("")}
                  />
                ) : null}
              </Flex>
            </FormControl>
          </Flex>
          <Box>
            <FormControl>
              <FormLabel>Sort by</FormLabel>
              <Select
                value={filter}
                onChange={(value) => setFilter(value)}
                options={FILTER_OPTIONS}
              />
            </FormControl>
          </Box>
        </Flex>
      </Flex>
      <Box mt={5}>
        <div className="timeline">
          {filteredData.map((el, index) => {
            const startDate = moment(el.startDate);
            const endDate = moment(el.endDate);

            return (
              <div
                key={el.id}
                className={`container ${index % 2 === 0 ? "left" : "right"}`}
              >
                <div className="content">
                  <h2>{el.title}</h2>
                  <Image src={el.url} />
                  <Box
                    mt={2}
                    display="inline-block"
                    p="1"
                    borderRadius={6}
                    bg={el.categoryColor}
                  >
                    {el.categoryName}
                  </Box>
                  <Box pos="relative">
                    <Flex
                      justifyContent="space-between"
                      mt={3}
                      pos="relative"
                      zIndex={2}
                    >
                      <Box bg={"white"}>
                        <Text color="green.300" fontWeight="bold">
                          START DATE
                        </Text>
                        <Flex
                          flexDir="column"
                          align="center"
                          overflow="hidden"
                          borderRadius={6}
                          shadow="md"
                          pb={2}
                        >
                          <Box height="20px" bg="green.300" width="100%"></Box>
                          <Text fontSize="x-large" py={2}>
                            {startDate.date()}
                          </Text>
                          <Text fontSize="medium">{startDate.month()}</Text>
                          <Text fontSize="medium">{startDate.year()}</Text>
                        </Flex>
                      </Box>
                      <Box bg={"white"}>
                        <Text color="red.300" fontWeight="bold">
                          END DATE
                        </Text>
                        <Flex
                          flexDir="column"
                          align="center"
                          overflow="hidden"
                          borderRadius={6}
                          shadow="md"
                          pb={2}
                        >
                          <Box height="20px" bg="red.300" width="100%"></Box>
                          <Text fontSize="x-large" py={2}>
                            {endDate.date()}
                          </Text>
                          <Text fontSize="medium">{endDate.month()}</Text>
                          <Text fontSize="medium">{endDate.year()}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                    <Box
                      height="40px"
                      pos="absolute"
                      left="0"
                      top="45px"
                      right="0"
                      bg="linear-gradient(90deg, #4ade8026, white, #f8717180)"
                      zIndex={1}
                    ></Box>
                    <Box mt={2} textAlign="justify">
                      {el.description}
                    </Box>
                  </Box>
                </div>
              </div>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

export default Home;
