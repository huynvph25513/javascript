type Props = {};
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Product = (props: Props) => {
  const { data: productData, error, isLoading } = useGetProductsQuery();
  const [
    removeProduct,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveProductMutation();

  const confirm = (id: number) => {
    removeProduct(id);
  };
  const dataSource = productData?.map(({ id, name, price }: IProduct) => ({
    key: id,
    name,
    price,
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      render: ({ key: id }: any) => {
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn có chắc chắn xóa không?"
                onConfirm={() => confirm(id)}
                okText="Có"
                cancelText="Không"
              >
                <Button type="primary" danger>
                  Xóa
                </Button>
              </Popconfirm>

              <Button type="primary" className="bg-blue-600">
                <Link to={`/product/${id}/edit`}>Sửa</Link>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
        <Button type="primary" className="bg-green-600">
          <Link to="/product/add" className="flex items-center space-x-2">
            <AiOutlinePlus />
            Thêm sản phẩm
          </Link>
        </Button>
      </header>
      {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default Product;
