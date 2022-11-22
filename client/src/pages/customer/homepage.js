import Navbar from "../../components/navbar"
import HomeImg from '../../assets/banner-2.jpg'
import { Link } from 'react-router-dom';
import rp from "rupiah-format";
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/api';

export default function Homepage() {
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    return(
        <div>
            <Navbar />
            <Container className='bodyhome'>
             <img src={HomeImg} alt="img" />
                <div>
                  <div className="d-flex flex-column bg-white py-4">
                     <p className="text-center px-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                          <div className="d-flex justify-content-center">
                        <Link to="/productList" className="btn btn-dark" replace>
                            Browse products
                        </Link>
                        </div>
                    </div>
                     {products?.map((item, index) => (
                            <div className="card-product mt-3">
                                <img 
                                    src={item.image} 
                                    className="img-fluid img-rounded" 
                                    alt={item.name} 
                                />
                                 <div className="card-body">
                                    <div className="text-header-product-item text-center">{item.name}</div>
                                    <div className="card-text text-center text-muted">{rp.convert(item.price)}</div>
                                    <div className="d-grid gap-2">
                                    <Link to={`/product/` + item.id} className="btn btn-outline-dark" replace>
                                        Detail
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        ))}  
                </div>
            </Container>
        </div>
    )
}