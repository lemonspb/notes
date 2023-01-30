import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/index";
import { verificate } from "../../slices/auth";
function Confirm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchVerificate = async () => {
      if (id) {
        const response = await dispatch(verificate(id)).unwrap();
        response?.isVerificate && navigate("/login");
      }
    };
    fetchVerificate();
  }, [id, navigate]);

  return <div>Хрюмпи!</div>;
}

export default Confirm;
