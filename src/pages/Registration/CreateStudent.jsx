import Card from "../UI/Card";
import { NavLink,useNavigate } from "react-router-dom";


function CreateStudent() {
    return (
        <>
            <Card title="Create Student">

                <div>
                    <b>Photo        :</b> <input type="file" name="photo" />
                </div>

                <div>
                    <b>Name         :</b> <input type="text" name="name" />
                </div>
                <div>
                    <b>Father`s Name:</b> <input type="text" name="fname" />
                </div>

                <div>
                    <b>Mother`s Name:</b> <input type="text" name="mname" />
                </div>


                <div>
                    <a  className="btn btn-success text-dark"><b>Save</b></a>
                </div>
            </Card>
        </>
    )
};

export default CreateStudent;