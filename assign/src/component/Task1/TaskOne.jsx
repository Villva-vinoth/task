import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './TaskOne.css';
import { CiEdit } from "react-icons/ci";
import { TiDocumentAdd } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import Modal from 'react-modal';
import axios from 'axios';
import { GET_ALL_SHEET_DATA, CREATE_SHEET_DATA, UPDATE_SHEET_DATA } from '../../service/ApiService';

const TaskOne = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [form, setForm] = useState({
        task: '',
        status: '',
        priority: '',
    });
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [refresh,setRefresh]= useState(true)

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

    const columns = [
        {
            name: "Task",
            selector: row => row.task,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
        },
        {
            name: "Priority",
            selector: row => row.priority,
            sortable: true,
        },
        {
            name: "Edit",
            cell: (row, index) => (
                <div className='edit-naming-btn' onClick={() => openModal('Edit', row, index)}>
                    <CiEdit size={25} color='#0070b9' />
                </div>
            )
        }
    ];

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

    const closeModal = () => {
        setIsOpen(false);
        setEditIndex(null);
    };

    const openModal = (title, task = { task: '', status: '', priority: '' }, index = null) => {
        setIsOpen(true);
        setTitle(title);
        setForm(task);
        setEditIndex(index);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (title === 'Add') {
                const dataToSend = [[form.task, form.status, form.priority]];
                setRefresh(false)
                await axios.post(CREATE_SHEET_DATA, { data: dataToSend }).then((res)=>{
                    setRefresh(true)   
                }).catch((error)=>{
                    console.log(error)
                })
            } else {
              
                setRefresh(false)
                // console.log("edit",editIndex+2)
                const dataToSend = {
                    rowIndex: editIndex + 2,
                    data: [[form.task, form.status, form.priority]]
                };
                await axios.put(UPDATE_SHEET_DATA, dataToSend).then((res)=>{
                    setRefresh(true)
                }).catch((error)=>{
                    console.log(error)
                })
            }
            setForm({ task: '', status: '', priority: '' });
             setRefresh(true)
            closeModal();
        } catch (error) {
            console.error("There was an error in the data!", error);
        }
    };

    useEffect(() => {
        const getFormData = async () => {
            try {
                const res = await axios.get(GET_ALL_SHEET_DATA);
                const data = res.data.data.values.slice(1).map(row => ({
                    task: row[0],
                    status: row[1],
                    priority: row[2]
                }));
                setTasks(data);
            } catch (error) {
                console.log(error);
            }
        };
        getFormData();
    }, [refresh]);

    return (
        <div className='naming-convention-main'>
            <header className='naming-convention-header'>
                <h2 className='naming-header'>Google Sheet Details</h2>
                <button onClick={() => openModal('Add')} className='naming-add-btn'><TiDocumentAdd size={20} /> Add</button>
            </header>

            <main className='Naming-convention-table'>
                <DataTable
                    customStyles={customStyle}
                    columns={columns}
                    data={tasks}
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
                        <h1 className='naming-modal'>{title} Task</h1>
                        <button className='naming-modal-close' onClick={closeModal}><MdClose size={20} className='close-modal-icon' /></button>
                    </header>

                    <div className='input-section'>
                        <div className='input-section-2'>
                            <div className='naming-section'>
                                <label>Status :</label>
                                <select name='status' value={form.status} onChange={handleChange}>
                                    <option>Select Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="progress">In Progress</option>
                                </select>
                            </div>
                            <div className='naming-section'>
                                <label>Priority :</label>
                                <select name='priority' value={form.priority} onChange={handleChange}>
                                    <option>Select Priority</option>
                                    <option value="Major">Major</option>
                                    <option value="Minor">Minor</option>
                                </select>
                            </div>
                        </div>
                        <div className='naming-section'>
                            <label>Task :</label>
                            <textarea value={form.task} onChange={handleChange} placeholder='Task' name='task'></textarea>
                        </div>
                    </div>

                    <div className="btns">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </section>
            </Modal>
        </div>
    );
};

export default TaskOne;
