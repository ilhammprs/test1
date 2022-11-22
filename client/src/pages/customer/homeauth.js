import NavbarAuth from '../../components/navbarAuth'
import HomeImg from '../../assets/banner-2.jpg'
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import rp from "rupiah-format";

export default function HomeAuth() {
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    return(
        <div>
            <NavbarAuth />
             <Container className='bodyhome'>
              <img src={HomeImg} alt="img"/>
                <div className="d-flex flex-column bg-white py-4">
                  <p className="text-center px-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                      <div className="d-flex justify-content-center">
                        </div>
                          </div>
                         <div>
                    {products?.map((item, index) => (
                        <div style={{ textDecoration: "none" }} item={item} key={index} >
                            <div className="card-product mt-3">
                                <img 
                                    src={item.image} 
                                    className="img-fluid img-rounded" 
                                    alt={item.name} 
                                />
                                <div className="p-2">
                                    <div className="text-header-product-item text-center">{item.name}</div>
                                    <div className="card-text text-center text-muted">{rp.convert(item.price)}</div>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            </Container>
        </div>
    )
}