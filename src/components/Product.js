import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/products/${product._id}`}>
        <CardImg src={product.image}></CardImg>
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div>
            {/* {product.rating} from {product.numReviews} reviews */}
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
