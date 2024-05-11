import React, { useState, useContext } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option
  } from "@material-tailwind/react";
import { addNewPassword } from "@/validations/validation"; 
import { UpdatePassword } from "@/api/authApi";
import { GlobalContext } from "@/context/context";
import { useNavigate } from "react-router-dom";

export function EditMO() {
  const {success, setSuccess  } = useContext(GlobalContext);
  const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedNewPassword = addNewPassword.safeParse(formData);
        if (!parsedNewPassword.success) {
            const errors = parsedNewPassword.error.issues.reduce((acc, issue) => {
                acc[issue.path[0]] = issue.message;
                return acc;
            }, {});
            setFormErrors(errors);
            return;
        }else{
          console.log(parsedNewPassword.data);
          UpdatePassword(parsedNewPassword.data)
              .then((response) => {
                console.log(response); 
                setSuccess({bool: true, message: 'Password berhasil diubah'});
                console.log(success);
                navigateTo('/mo/home');
            })
            .catch((err) => {
                console.error(err);
            });
        }
    };

    return (
      <Card color="white" shadow={false}>
          <div className="border rounded-xl border-gray-400 p-4 shadow-md">
              <form className="mt-8 mb-2" onSubmit={handleSubmit}>
                  <div className="mb-1 gap-6 grid grid-cols-1 md:grid-cols-2">
                      <div>
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                              New Password
                          </Typography>
                          <Input
                              type="password"
                              name="password"
                              size="lg"
                              onChange={handleChange}
                              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          />
                          {formErrors.password && (
                              <p className="text-red-600 font-medium">
                                  {formErrors.password}
                              </p>
                          )}
                      </div>
                      <div>
                          <Typography variant="h6" color="blue-gray" className="mb-3">
                              Confirm Password
                          </Typography>
                          <Input
                              type="password"
                              name="password_confirmation"
                              size="lg"
                              onChange={handleChange}
                              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          />
                          {formErrors.password_confirmation && (
                              <p className="text-red-600 font-medium">
                                  {formErrors.password_confirmation}
                              </p>
                          )}
                      </div>
                  </div>
                  <div className="flex justify-end">
                      <Button type="submit" className="mt-6">
                          Save
                      </Button>
                  </div>
              </form>
          </div>
      </Card>
  );
}
