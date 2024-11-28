import './top.css'
import React from 'react'

// Imported Icons ===========>
import { BiSearchAlt } from 'react-icons/bi'
import { TbMessageCircle } from 'react-icons/tb'
import { MdOutlineNotificationsNone } from 'react-icons/md'

// Imported Image =========>
import img from '../../../Assets/user (3).png'

export default function Navtop() {
    return (
        <div className='topSection'>
            <div className="headerSection flex">
                <div className="title">
                    <h1>ยินดีต้อนรับสู่ระบบ ERP</h1>
                    <p>พร้อมจะเริ่มงานกันหรือยังครับ</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className="icon" />
                </div>

                <div className="adminDiv flex">
                    <TbMessageCircle className="icon" />
                    <MdOutlineNotificationsNone className="icon" />
                    <div className="adminImage">
                        <img src={img} alt="Admin Image" />
                    </div>
                </div>

            </div>


        </div>
    )
}
