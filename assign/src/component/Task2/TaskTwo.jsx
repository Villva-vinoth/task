import React, { useEffect, useState } from 'react'
import { CREATE_INVOICE, GET_ALL_INVOICE } from '../../service/ApiService';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { TiDocumentAdd } from 'react-icons/ti';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import './TaskTwo.css'
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const TaskTwo = ({setInvoiceNum}) => {

    const nav= useNavigate()
    const [refresh,setRefresh]= useState(true)
    const [data,setData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);

    const columns = [
        {
            name: "Invoice Id",
            selector: row => row.invoice_id || "n/a",
            sortable: true,
        },
        {
            name: "Holder Name",
            selector: row => row.invoice_name || "n/a",
            sortable: true,
        },
        {
            name: "Edit",
            cell: (row, index) => (
                <div className='edit-naming-btn' onClick={() =>handleNav(row.invoice_id) }>
                    <CiEdit size={25} color='#0070b9' />
                </div>
            )
        }
    ];

    const handleNav = (item)=>{
        setInvoiceNum(item)
        nav('/task-transaction')
    }

    const customStyle = {
        headCells: {
            className: "datatable-header",
            style: {
                fontSize: "16px",
                fontWeight: "600",
                color: "#000",
                background: "#f4f6f8",
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

 


    const [invoice,setInvoice]= useState({
        invoiceName:"",
        address:""
    })

    const openModal = ()=>{
        setIsOpen(true)
    }

    const closeModal = ()=>{
        setIsOpen(false)
    }

    const handleSubmit = async ()=>{
       const { invoiceName, address } = invoice

       if(!invoiceName && !address){
        console.log("enter the all field !")
       }
       else{
         setRefresh(true)
         try{
            const res =await axios.post(CREATE_INVOICE,invoice)
            setRefresh(false)

         }
         catch(error){
            console.log(error)
         }  
         finally{
            setRefresh(false)
         }
             }
    }

    const handleChange = (e)=>{
        setInvoice({...invoice,[e.target.name]:e.target.value})
    }


    useEffect(() => {
        const getFormData = async () => {
            try {
                const res = await axios.get(GET_ALL_INVOICE);
                console.log(res.data)
                setData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFormData();
    }, [refresh]);


  return (
    <div>
        <div className='naming-convention-main'>
            <header className='naming-convention-header'>
                <h2 className='naming-header'>Invoice Details</h2>
                <button onClick={() => openModal()} className='naming-add-btn'><TiDocumentAdd size={20} /> Add</button>
            </header>

            <main className='Naming-convention-table'>
                <DataTable
                    customStyles={customStyle}
                    columns={columns}
                    data={data}
                    fixedHeader
                    fixedHeaderScrollHeight='450px'
                    pagination
                    highlightOnHover
                    selectableRows
                    selectableRowsHighlight
                />
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
                        <h1 className='naming-modal'>Invoice</h1>
                        <button className='naming-modal-close' onClick={closeModal}><MdClose size={20} className='close-modal-icon' /></button>
                    </header>

                    <div className='input-section'>
                        <div className='input-section-2'>
                            <div className='naming-section'>
                                <label>Name :</label>
                                <input name='invoiceName' value={invoice.invoiceName} onChange={handleChange} />
                            </div>
                            
                        </div>
                        <div className='naming-section'>
                            <label>Address :</label>
                            <textarea value={invoice.address} onChange={handleChange} placeholder='Address' name='address'></textarea>
                        </div>
                    </div>

                    <div className="btns">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </section>
            </Modal>

        </div>
    </div>
  )
}

export default TaskTwo