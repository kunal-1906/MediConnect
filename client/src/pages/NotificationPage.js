import Layout from "../components/layout";
import { message, Tabs, Badge, Button, List, Card, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BellFilled, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    const handleMarkAllRead = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification',
                {userId: user._id},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error("Something Went Wrong")
        }
    };

    const handleDeleteAllRead = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification', 
                {userId: user._id},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            message.error('Something Went Wrong in Notifications')
        }
    };

    return (
        <Layout>
            <div
                className="home-container"
                style={{
                    backgroundImage: "url('/bghome.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    padding: '2rem',
                    position: 'relative',
                }}
            >
                <Card 
                    bordered={false}
                    style={{
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space align="center" style={{ marginBottom: '20px' }}>
                            <BellFilled style={{ fontSize: '24px', color: '#1890ff' }} />
                            <Text strong style={{ fontSize: '20px' }}>Notifications</Text>
                        </Space>

                        <Tabs 
                            defaultActiveKey="0"
                            tabBarStyle={{ marginBottom: '24px' }}
                        >
                            <Tabs.TabPane 
                                tab={
                                    <span>
                                        <Badge count={user?.notification?.length || 0} offset={[10, -5]}>
                                            Unread
                                        </Badge>
                                    </span>
                                } 
                                key={0}
                            >
                                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                                    <Button 
                                        type="primary" 
                                        icon={<CheckOutlined />}
                                        onClick={handleMarkAllRead}
                                    >
                                        Mark All as Read
                                    </Button>
                                </div>

                                <List
                                    itemLayout="horizontal"
                                    dataSource={user?.notification || []}
                                    renderItem={item => (
                                        <List.Item 
                                            onClick={() => navigate(item.onClickPath)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                transition: 'all 0.3s',
                                                marginBottom: '8px',
                                                backgroundColor: '#f6f6f6',
                                                ':hover': {
                                                    backgroundColor: '#e6f7ff',
                                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                                }
                                            }}
                                        >
                                            <List.Item.Meta
                                                title={<Text strong>{item.message}</Text>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Tabs.TabPane>

                            <Tabs.TabPane 
                                tab={
                                    <span>
                                        <Badge count={user?.seennotification?.length || 0} offset={[10, -5]}>
                                            Read
                                        </Badge>
                                    </span>
                                } 
                                key={1}
                            >
                                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                                    <Button 
                                        danger 
                                        icon={<DeleteOutlined />}
                                        onClick={handleDeleteAllRead}
                                    >
                                        Delete All Read
                                    </Button>
                                </div>

                                <List
                                    itemLayout="horizontal"
                                    dataSource={user?.seennotification || []}
                                    renderItem={item => (
                                        <List.Item 
                                            onClick={() => navigate(item.onClickPath)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                transition: 'all 0.3s',
                                                marginBottom: '8px',
                                                backgroundColor: '#f6f6f6',
                                                ':hover': {
                                                    backgroundColor: '#fff2f0',
                                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                                }
                                            }}
                                        >
                                            <List.Item.Meta
                                                title={<Text type="secondary">{item.message}</Text>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </Space>
                </Card>
            </div>
        </Layout>
    )
}

export default NotificationPage;