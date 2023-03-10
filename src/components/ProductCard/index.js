import { Badge, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export function Rating({ rating, numReviews, ...props }) {
  return (
    <>
      <Flex {...props}>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && "s"}
        </Box>
      </Flex>
    </>
  );
}

const ProductCard = (props) => {
  const data = props.data;
  return (
    <Link href={`/productDetails/${data.productId}`}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="200"
        h="250"
        shadow="lg"
        //   position="relative"
        _hover={{
          background: "white",
          color: "mOrange",
        }}
      >
        <Box
          h={120}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <Image
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            width={120}
            height={120}
            layout="responsive"
            // showThumbs={false}
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex
            mt="1"
            justifyContent="space-between"
            alignContent="center"
            flexDir={"column"}
          >
            <Box
              fontSize="md"
              fontWeight="semibold"
              as="h6"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
            <Box fontSize="md" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="md">
                Rs.
              </Box>
              {data.price.toFixed(2)}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
