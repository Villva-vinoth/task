import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './TaskTwo.css';
import { CREATE_INVOICE_TRANSACTION, GET_INVOICE_TRANSACTION } from '../../service/ApiService';

const TaskTransaction = ({ invoiceId }) => {
    const [refresh, setRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [invoiceTransaction, setInvoiceTransaction] = useState({
        itemName: "",
        description: "",
        quantity: "",
        productId: "",
        subTotal: ""
    });
    const [subTotal, setSubTotal] = useState('');

    const columns = [
        {
            name: "Item Name",
            cell: (row) => (
                <div className='table-content'>
                    <h4>{row.item_name}</h4>
                    <h6>{row.description}</h6>
                </div>
            ),
        },
        {
            name: "productId",
            selector: row => row.product_id || "n/a",
        },
        {
            name: "quantity",
            selector: row => row.quantity || "n/a"
        },
        {
            name: "subTotal",
            selector: row => `$` + row.sub_total || "n/a"
        }
    ];

    const customStyle = {
        headCells: {
            className: "datatable-header",
            style: {
                fontSize: "16px",
                fontWeight: "600",
                color: "#000",
                background: "#0070b9",
            },
        },
        cells: {
            style: {
                fontSize: "15px",
            },
        },
    };

    const customStyles = {
        overlay: {
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "40%",
            zIndex: "9999 !important",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            color: "black",
            padding: 0,
        },
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        const { itemName, description, quantity, productId, subTotal } = invoiceTransaction;

        if (!itemName && !description && !quantity && !productId && !subTotal) {
            console.log("enter the all field !");
        } else {
            setRefresh(true);
            try {
                invoiceTransaction.invoiceId = invoiceId;
                await axios.post(CREATE_INVOICE_TRANSACTION, invoiceTransaction);
                setRefresh(false);
                setIsOpen(false);
            } catch (error) {
                console.log(error);
            } finally {
                setRefresh(false);
            }
        }
    };

    const handleChange = (e) => {
        setInvoiceTransaction({ ...invoiceTransaction, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getFormData = async () => {
            try {
                const res = await axios.get(`${GET_INVOICE_TRANSACTION}/${invoiceId}`);
                console.log(res.data);
                setData(res.data.data);

                const total = res.data.data.map((item) => item.sub_total);
                console.log(total);
                setSubTotal(total);
            } catch (error) {
                console.log(error);
            }
        };
        getFormData();
    }, [refresh]);

    const downloadPDF = () => {
        const input = document.querySelector('.naming-convention-main');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape');
                pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                pdf.save("download.pdf");
            });
    };

    return (
        <div>
            <div className='naming-convention-main'>
                <header className='transaction-main-header'>
                    <button onClick={openModal}> Add</button>
                    <button onClick={downloadPDF}> Download</button>
                </header>

                {data && (
                    <>
                        <header className='header-two'>
                            <h1>{data[0]?.invoice_name}</h1>
                            <div>{data[0]?.address}</div>
                        </header>
                        <header className='header-three'>
                            <div className='sector-1'>
                                <h4>{data[0]?.invoice_name}</h4>
                                <h6>{data[0]?.address}</h6>
                            </div>
                            <div className='sector-2'>
                                <h4>#{(data[0]?.invoice_id)?.toString()?.padStart(4, '0')}</h4>
                                <h4>{(new Date(data[0]?.date)).toString().split('G')[0]}</h4>
                            </div>
                        </header>
                    </>
                )}

                <main className='Naming-convention-table'>
                    <DataTable
                        customStyles={customStyle}
                        columns={columns}
                        data={data}
                        fixedHeader
                        fixedHeaderScrollHeight='450px'
                        highlightOnHover
                        selectableRowsHighlight
                    />
                    <div className='main-table'>
                        <div className='table'>
                            subtotal Shipping & Handling Tax
                            <br />
                            <span className='color-green'>Grand Total</span>
                        </div>
                        <div className='table-2'>
                            {data && data.map((item) => (
                                <div className='sub-total'>${item?.sub_total}</div>
                            ))}
                            <div className='sub-total color-green'>
                                {subTotal && subTotal.reduce((first, current) => first + current, 0)}
                            </div>
                        </div>
                    </div>
                </main>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <section className="naming-section-main">
                        <header className='naming-modal-header'>
                            <h1 className='naming-modal'>Invoice Transaction</h1>
                            <button className='naming-modal-close' onClick={closeModal}>
                                <MdClose size={20} className='close-modal-icon' />
                            </button>
                        </header>

                        <div className='input-section'>
                            <div className='input-section-2'>
                                <div className='naming-section'>
                                    <label>item Name :</label>
                                    <input name='itemName' value={invoiceTransaction.itemName} onChange={handleChange} />
                                </div>
                                <div className='naming-section'>
                                    <label>Product Id :</label>
                                    <input name='productId' value={invoiceTransaction.productId} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-section-2'>
                                <div className='naming-section'>
                                    <label>Quantity :</label>
                                    <input name='quantity' value={invoiceTransaction.quantity} onChange={handleChange} />
                                </div>
                                <div className='naming-section'>
                                    <label>Sub Total :</label>
                                    <input name='subTotal' value={invoiceTransaction.subTotal} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='naming-section'>
                                <label>description :</label>
                                <textarea value={invoiceTransaction.description} onChange={handleChange} placeholder='Address' name='description'></textarea>
                            </div>
                        </div>

                        <div className="btns">
                            <button onClick={handleSubmit}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </section>
                </Modal>
            </div>
            <footer className='footer'>
                Thank you for your Business
            </footer>
        </div>
    );
};

export default TaskTransaction;
