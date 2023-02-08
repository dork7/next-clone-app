import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Switch,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

const AddProduct = () => {
  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const numOfReviewsRef = useRef();
  const ratingsRef = useRef();
  const [rating, setRating] = React.useState('1');
  const [genStaticPages, setGentStaticPages] = React.useState(false);

  const formSubmitted = async (e) => {
    e.preventDefault();
    console.log('imageRef :>> ', imageRef);
    console.log('refs :>> ');
    console.log(imageRef.current.files);
    console.log(nameRef.current.value);
    console.log(priceRef.current.value);
    console.log(numOfReviewsRef.current.value);
    console.log(rating);
    console.log(genStaticPages);

    const imgFile = imageRef.current.files[0];

    const formData = new FormData();
    formData.append('imageFile', imgFile);
    const data = await fetch('/api/products', {
      method: 'POST',
      body: formData,
      dataType: 'jsonp',
    });

    const result = await data.json();
    console.log('data.json ():>> ', result);
  };

  return (
    <>
      <Box
        fontSize="2xl"
        fontWeight="semibold"
        as="h2"
        // lineHeight="tight"
        color={'gray.500'}
        isTruncated
      >
        Add Product
      </Box>
      <form onSubmit={formSubmitted}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          backgroundColor="whiteAlpha.900"
          p={6}
          w={'60vw'}
        >
          <FormControl isRequired>
            <FormLabel>Product name</FormLabel>
            <Input placeholder="Product name" ref={nameRef} />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input placeholder="" ref={priceRef} />
          </FormControl>
          <FormControl>
            <FormLabel>Number of Reviews</FormLabel>
            <Input placeholder="" ref={numOfReviewsRef} />
          </FormControl>

          <GridItem p={2}>
            <FormLabel>Choose an image:</FormLabel>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={imageRef}
            ></input>{' '}
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl as="fieldset">
              <FormLabel as="legend">Ratings</FormLabel>
              <RadioGroup onChange={setRating} value={rating}>
                <HStack spacing="24px">
                  <Radio value="1">Ok</Radio>
                  <Radio value="2">Good</Radio>
                  <Radio value="3">Very Good</Radio>
                  <Radio value="4">Best</Radio>
                  <Radio value="5">Unmatchable</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          <GridItem my={2}>
            <FormLabel htmlFor="gen-pages">Generate Static Page</FormLabel>
            <Switch
              id="gen-pages"
              value={genStaticPages}
              onChange={() => setGentStaticPages((prev) => !prev)}
            />
          </GridItem>
          <GridItem colStart={2} p={2}>
            <Button
              borderRadius={0}
              type="submit"
              bgColor="mOrange"
              width="full"
              _hover={{ color: 'white' }}
            >
              Publish Product
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default AddProduct;