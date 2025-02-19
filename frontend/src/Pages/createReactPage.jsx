import { useNavigate } from "react-router-dom";
import { createproject } from "../hooks/apis/mutations/useCreateProject";
import { Button, Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const layoutStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f2f5",
};

const headerStyle = {
    textAlign: 'center',
    color: '#ffffff',
    height: 80,
    lineHeight: '80px',
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundColor: '#1a73e8',
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const contentStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    color: '#333333',
    backgroundColor: '#ffffff',
    borderRadius: "8px",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const footerStyle = {
    textAlign: 'center',
    color: '#ffffff',
    height: 60,
    lineHeight: '60px',
    backgroundColor: '#1a73e8',
    fontSize: "20px",
    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
};

export const CreateReactPage = () => {
    const navigate=useNavigate();

    const { createprojectmutation, isPending } = createproject();

    const handleOnClick = async () => {
        console.log("going to trigger create react page");
        try {
            const response=await createprojectmutation();
            console.log("redirecting to playground");

            navigate(`/projects/${response.data}`);

        } catch (error) {
            console.log("error in creating react page");
            console.log(error);
            throw error;
        }
    };

    return (
        <Flex style={{ height: "100vh", flexDirection: "column" ,overflow:"hidden" }}>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>CREATE REACT PAGE</Header>
                <Content style={contentStyle}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleOnClick}
                        loading={isPending}
                        style={{ padding: "0 24px", borderRadius: "8px" }}
                    >
                        Create Project
                    </Button>
                </Content>
                <Footer style={footerStyle}>Footer Content © 2025</Footer>
            </Layout>

        </Flex>
    );
};
