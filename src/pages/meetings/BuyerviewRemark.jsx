import React, { useState } from 'react'
import EditRemark from './EditRemark'

function BuyerviewRemark(props) {
    const [editshow, seteditshow] = useState(false)

  return (
    <>
    {
        editshow == true ?
        <EditRemark sidebar={props.sidebar} supplier={props.supplier}/>
        :
   <div className={(props.sidebar ? "active " : " ") + "router-body"}>
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">
                            Buyer</a></li>
                        <li><a href="#"><span> My Meetings </span></a></li>
                        <li><a onClick={()=>props.setsection(21)}><span> Passed Meetings </span></a></li>
                        <li><a href="#"><span> View Remark</span></a></li>
                    </ul>
                </div>
                <div className="remark_wrap row justify-content-between">
                    <div className="column">
                        <h2>View Remark</h2>
                    </div>
                    <div className="column">
                        <p id="edit" onClick={()=>seteditshow(true)} style={{cursor:"pointer"}}>Edit Remark <img src="images/edit (1).svg" alt="" /></p>
                    </div>
                </div>
                <form action="">
                    <div className="form">
                        <input type="text" id="text" value="Lorem Ipsum dolor" className="form-control" placeholder="" disabled />
                    </div>
                    <div className="form"> 
                        <textarea name="description" id="textarea" value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,">
                        </textarea>
                    </div>
                    <div className="btn_wrapper row">
                        <a id="back" href="" className="btn btn-secondary">Back</a>
                        <a id="resubmit" type="submit" href="" className="btn btn-secondary" 
                        style={{display:"none"}}
                        >Resubmit</a>
                        <a id="cancel" href="" className="btn btn-primary"
                        style={{display:"none"}}
                        >Cancel</a>
                    </div>
                </form>
            </div>

    }

    </>
  )
}

export default BuyerviewRemark