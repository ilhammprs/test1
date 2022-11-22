import Navbar from "../../components/navbar"
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
                  <div>
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