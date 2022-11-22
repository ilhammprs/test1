import Navbar from "../../components/navbar"
import { Container, Table } from "react-bootstrap"
import { useQuery } from 'react-query';
import { API } from '../../config/api';

export default function History() {
    let { data: transactions } = useQuery('transactionsCache', async () => {
      const response = await API.get('/transactions');
      return response.data.data;
    });

    return(
        <div>
            <Navbar />
            <h4 className="add-product">Riwayat Transaksi</h4>
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
                    {transactions?.map((item, index) => (
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