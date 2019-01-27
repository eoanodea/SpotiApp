import React, { Component } from "react";
import { getList, addToList, deleteItem, updateItem } from './ListFunctions.Component';

class List extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            term: "",
            editDisabled: false,
            items: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    onChange = event => {
        this.setState({ term: event.target.value, editDisabled: "disabled" });
        console.log(this.state.editDisabled);
    };

    getAll = () => {
        getList().then(data => {
            this.setState(
                {
                    term: "",
                    items: [...data]
                },
                () => {
                    console.log(this.state.items);
                }
            );
        });
    };

    onSubmit = e => {
        e.preventDefault();
        addToList(this.state.term).then(() => {
            this.getAll();
        });
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

    onDelete = (val, e) => {
        e.preventDefault();
        deleteItem(val);

        var data = [...this.state.items];
        data.filter(function (item, index) {
            if (item[1] === val) {
                data.splice(index, 1);
            }
        });
        this.setState({ items: [...data] });
    };

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Add a song!</label>
                        <div className="row">
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    value={this.state.term || ""}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="col-md-2 listSubmit">
                                <button
                                    type="submit"
                                    onClick={this.onSubmit.bind(this)}
                                    className="btn btn-success btn-block submitButton ">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index} className="fade-in">
                                <td className="text-left">{item[0]}</td>
                                <td className="text-right">
                                    <button
                                        href=""
                                        className="btn btn-info mr-1 listEdit"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onEdit.bind(this, item[0], item[1])}
                                    >
                                        Edit
                  </button>
                                    <button
                                        href=""
                                        className="btn btn-danger listDelete"
                                        onClick={this.onDelete.bind(this, item[1])}
                                    >
                                        Delete
                  </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;
