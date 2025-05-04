import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({doctor}) => {  // ✅ Use PascalCase (capital D)
 
    const navigate = useNavigate();
 
 
 
    return (
   <>

        <div className='card m-2'
        
        style={{cursor: 'pointer'}}
        onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
            <div className='card-header'>

                   <b>Dr. {doctor.firstname} {doctor.lastname}</b>

            </div>
            <div className='card-body'>
                <p>
                    <b>
                    Specialisation:
                    </b> {doctor.specialisation}
                </p>
                <p>
                    <b>
                    Experience:
                    </b> {doctor.experience} years
                </p>
                <p>
                    <b>
                    Fees Per Consultation:
                    </b> ₹ {doctor.feesPerConsultation}
                </p>
                <p>
                    <b>
                    Timings:
                    </b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>

            </div>
        </div>


   </>
  );
};

export default DoctorList;  // ✅ Match export name
