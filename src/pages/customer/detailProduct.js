import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import convertRupiah from 'rupiah-format';
import Navbar from '../../components/navbar';
import { useQuery, useMutation } from 'react-query';
import { useState } from 'react';
import { API } from '../../config/api';

export default function DetailProduct() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [state, setState] = useState();

    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    const handleCart = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            'Content-type': 'application/json',
            },
        };

        const data = {
            idProduct: product.id,
            idSeller: product.user.id,
            name: product.name,
            price: product.price,
        };

        const body = JSON.stringify(data);
        await API.post('/cart', body, config);

        navigate('/');
        } catch (error) {
        console.log(error);
        }
    });
    return(
        <div>
            <Navbar />
            <Container className="py-5">
            <Row>
                <Col xs={12} md={5}>
                  <img
                    src={product?.image}
                    style={{ width: "80%" }}
                    className='mt-5 pt-5'
                    alt="transaction"
                  />
              </Col>
            <Col md="5">
                <div className="d-flex flex-column h-100">
                <h2 className="mb-1">{product?.name}</h2>
                <h4 className="text-muted mb-4">{convertRupiah.convert(product?.price)}</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100"  onClick={(e) => handleCart.mutate(e)} style={{ width: '100%' }}>
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">Cases & Covers</dd>

              <dt className="col-sm-4">Brand</dt>
              <dd className="col-sm-8 mb-3">iPhone X</dd>

              <dt className="col-sm-4">Manufacturer</dt>
              <dd className="col-sm-8 mb-3">Nillkin</dd>

              <dt className="col-sm-4">Color</dt>
              <dd className="col-sm-8 mb-3">Red, Green, Blue, Pink</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">{product?.stock}</dd>

              {/* <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd> */}
            </dl>

          <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>{product?.desc}</small>
                    </p>
                     </div>
                   </Col>
                </Row>
            </Container>
        </div>
    )
}