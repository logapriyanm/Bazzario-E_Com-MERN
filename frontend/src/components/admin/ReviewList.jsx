import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ReviewList() {
  const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(
    (state) => state.productState
  );
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (productId.trim() !== "") {
      dispatch(getReviews(productId));
    } else {
      toast.error("Please enter a valid Product ID");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    if (isReviewDeleted) {
      toast.success("Review Deleted Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
      return;
    }
  }, [dispatch, error, isReviewDeleted, productId]);

  const columns = [
    { name: "ID", selector: (row) => row._id, sortable: true },
    { name: "Rating", selector: (row) => row.rating, sortable: true },
    { name: "User", selector: (row) => row.user.name, sortable: true },
    { name: "Comment", selector: (row) => row.comment, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          onClick={(e) => deleteHandler(e, row._id)}
          className="btn btn-danger py-1 px-2 ml-2"
        >
          <i className="fa fa-trash"></i>
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Review List</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-5">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  onChange={(e) => setProductId(e.target.value)}
                  value={productId}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block py-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={reviews}
              pagination
              striped
              highlightOnHover
              persistTableHead
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
