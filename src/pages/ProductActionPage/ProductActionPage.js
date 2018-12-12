import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    componentDidMount() {
        const { match } = this.props;

        if(match){
            const id = match.params.id;

            this.props.onEditProduct(id);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){

            const { itemEditing } = nextProps

            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.price
            });
        }
    }
    

    render() {
        
        const { txtName, txtPrice, chkbStatus } = this.state;
        
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <legend>Thêm mới sản phẩm</legend>
                
                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input value={txtName} onChange={this.onChange} type="text" className="form-control" name="txtName" />
                    </div>
                
                    <div className="form-group">
                        <label>Giá</label>
                        <input value={txtPrice} onChange={this.onChange} type="number" className="form-control" name="txtPrice" />
                    </div>
                    
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input onChange={this.onChange} type="checkbox" name="chkbStatus" checked={chkbStatus} />
                            còn hàng
                        </label>
                    </div>
                    
                    <Link to="/product-list" className="btn btn-danger mr-10">Trở lại</Link>
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>
                
            </div>
        );
    }

    onChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    onSave = e => {

        const { id, txtName, txtPrice, chkbStatus } = this.state;
        const { history } = this.props;

        const product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }

        e.preventDefault();
    
        if(id){
            this.props.onUpdateProduct(product);
            history.goBack();
        }
        else{
            this.props.onAddProduct(product);
            history.goBack();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct: id => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct: product => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);