import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { MODAL } from "../../constants";
import { BlogPost } from "../../redux/posts/postsSlice";

const { TextArea } = Input;

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
  handleSave: (post: BlogPost) => void;
  post: BlogPost;
}
export const EditPostForm = (props: Props) => {
  const { isModalOpen, handleClose, handleSave, post } = props;
  const [form] = Form.useForm();
  const [updatedPost, setUpdatedPost] = useState<BlogPost>(post);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsSaveDisabled(false);
      },
      () => {
        setIsSaveDisabled(true);
      }
    );
  }, [values]);

  const handleChangeTitle = (e: any) => {
    setUpdatedPost({ ...updatedPost, title: e.target.value });
  };

  const handleChangeBody = (e: any) => {
    setUpdatedPost({ ...updatedPost, body: e.target.value });
  };

  const handleCloseForm = () => {
    form.resetFields();
    handleClose();
  };

  const handleSavePost = () => {
    handleSave(updatedPost);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title={`${MODAL.TITLE} ${post.id}`}
        onOk={handleSavePost}
        onCancel={handleCloseForm}
        footer={[
          <Button key={MODAL.BUTTONS.CANCEL_KEY} onClick={handleCloseForm}>
            {MODAL.BUTTONS.CANCEL}
          </Button>,
          <Button
            key={MODAL.BUTTONS.SAVE_KEY}
            type="primary"
            onClick={handleSavePost}
            disabled={isSaveDisabled}
          >
            {MODAL.BUTTONS.SAVE}
          </Button>,
        ]}
      >
        <Form
          name="trigger"
          style={{ maxWidth: 600 }}
          layout="vertical"
          autoComplete="off"
          form={form}
        >
          <Form.Item
            hasFeedback
            name={MODAL.NAMES.TITLE}
            label={MODAL.LABELS.TITLE}
            validateTrigger="onBlur"
            rules={[
              { min: 3, message: MODAL.FORM_MESSAGES.TITLE_LENGTH },
              { required: true, message: MODAL.FORM_MESSAGES.TITLE_REQUIRED },
            ]}
            initialValue={post.title}
          >
            <Input
              placeholder={MODAL.FORM_PLACEHOLDER}
              onChange={handleChangeTitle}
              value={updatedPost.title}
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name={MODAL.NAMES.BODY}
            label={MODAL.LABELS.BODY}
            validateTrigger="onBlur"
            rules={[
              { min: 5, message: MODAL.FORM_MESSAGES.BODY_MIN_LENGTH },
              { max: 250, message: MODAL.FORM_MESSAGES.BODY_MAX_LENGTH },
              { required: true, message: MODAL.FORM_MESSAGES.BODY_REQUIRED },
            ]}
            initialValue={updatedPost.body}
          >
            <TextArea
              placeholder={MODAL.FORM_PLACEHOLDER}
              rows={10}
              showCount
              onChange={handleChangeBody}
              value={updatedPost.body}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
