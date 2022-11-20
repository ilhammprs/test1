import NavbarAdmin from "../../components/navbarAdmin"
import { Container, Table } from "react-bootstrap"
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import { useEffect, useState } from "react";
import { ImCross, ImCheckmark } from "react-icons/im";

export default function TransactionAdmin() {

    let { data: transadmin } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transadmin');
        console.log(response);
        return response.data.data;
    });
    const [action, setAction] = useState("")
    const checkAct = () => {
        transadmin?.map((item) => {
            if (item.status === "Success") {
                setAction(<ImCheckmark />);
            }   else {
                  setAction(<ImCross />);
                }
        })
    };

    useEffect(() => {
        checkAct();
    }, []);
    return(
        <div>
            <NavbarAdmin />
            <h4 className="add-product">Transaksi Masuk</h4>
            <Container className="add-product">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Alamat</th>
                        <th>Kode pos</th>
                        <th>Pesanan Produk</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    {transadmin?.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                        <td>{index + 1}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.address}</td>
                        <td>{item.postcode}</td>
                        <td>{item.list}</td>
                        <td>{item.status}</td>
                        </tr>
                    </tbody>
                    ))}
                </Table>
            </Container>
        </div>
    )
}