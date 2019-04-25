import axios from "axios";

//get all song with axios
//axios is promise based HTTP client for the browser and node.js
export const getList = () => {
    return axios
        .get("http://localhost:5000/api/tasks", {
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            return res.data;
        });
    /*.then(data => {
        console.log(data);
      });*/
};

// add a song
export const addToList = term => {
    return axios
        .post(
            "http://localhost:5000/api/task",
            {
                title: term,

            },
            {
                headers: { "Content-Type": "application/json" }
            }
        )
        .then(function (response) {
            console.log(response);
        });
};

//delete a song
export const deleteItem = term => {
    axios
        .delete(`http://localhost:5000/api/task/${term}`, {
            headers: { "Content-Type": "application/json" }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

//edit a song
export const updateItem = (term, id) => {
    return axios
        .put(
            `http://localhost:5000/api/task/${id}`,
            {
                title: term,

            },
            {
                headers: { "Content-Type": "application/json" }
            }
        )
        .then(function (response) {
            console.log(response);
        });
};


this.state = {
    id: "",
    term: "",
    items: []
};

onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.term, this.state.id).then(() => {
        this.getAll();
    });
};

onEdit = (item, itemid, e) => {
    e.preventDefault();
    this.setState({
        id: itemid,
        term: item
    });
};

<input
    type="text"
    className="form-control"
    id="exampleInputEmail1"
    value={this.state.term || ""}
    onChange={this.onChange.bind(this)}
/>
<button
    className="btn btn-primary"
    onClick={this.onUpdate.bind(this)}
>
    Update
</button>

<button
    href=""
    className="btn btn-info mr-1 listEdit"
    disabled={this.state.editDisabled}
    onClick={this.onEdit.bind(this, item[0], item[1])}>
    Edit
</button>
<button
    href=""
    className="btn btn-danger listDelete"
    onClick={this.onDelete.bind(this, item[1])}>
    Delete
</button>
