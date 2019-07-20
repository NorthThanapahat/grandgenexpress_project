const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var moment = require('moment-timezone');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
}));
app.listen(7777, "0.0.0.0", () => {
      console.log(moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss'));
      console.log("server is running on port 7777")
});


const db = require('./connectDB');


db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      console.log(db.state);

      if (db.state == "disconnected") {
            console.log("disconnected");
      }
});

app.get('/', (req, res) => {
      res.json({ message: "Hello Grandgenexpress.com", db_status: db.state, time: moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss') });
});

function GetResAuth(res, result, fields) {
      if (result[0] != undefined) {
            const user = {
                  username: result[0].username
            }
            console.log("result:", result[0]);
            console.log("fields:", fields);

            jwt.sign({ user }, 'token', (err, token) => {
                  res.json({
                        ResponseCode: "Success",
                        username: result[0].username,
                        token: token
                  });
            });
      } else {
            res.json({
                  ResponseCode: "Error",
                  ResponseMessage: "User or Password is valid"
            });
      }

}

function ConnectDB() {
      if (db.state != "authenticated") {
            db.connect(function (err) {
                  if (err) throw err;
                  Console.log("Database Connected!");
            });
      }
}

function verifyToken(req, res, next) {
      const tokenHeader = req.headers['token'];
      console.log(tokenHeader);
      if (typeof tokenHeader !== 'undefined') {
            req.token = tokenHeader;
            next();
      } else {
            res.sendStatus(403);
      }
}

app.post('/auth', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      console.log(req.body);
      ConnectDB();
      db.query("SELECT * FROM user WHERE username = '" + username + "'AND password = '" + password + "'", function (err, result, fields) {
            if (err) throw err;
            GetResAuth(res, result, fields);
      });
});

app.post('/userInfomation', (req, res) => {
      // console.log('req.token ===>',req.token);
      // jwt.verify(req.token, 'secretkey', (err, resultData) => {
      //       console.log(err);
      //       if (err) {
      //             res.sendStatus(403);
      //       } else {
      var username = req.body.username;
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            // GetResAuth(res, result, fields);
            res.json({
                  ResponseCode: "Success",
                  ResponseData: result[0]
            });
      });
      //       }
      // });
});
app.post('/createUser', (req, res) => {

      var username = req.body.username;
      var password = req.body.password;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var email = req.body.email;
      var userRole = req.body.userRole;
      var userRef = req.body.userRef;


      ConnectDB();

      db.query(`INSERT INTO user_details (username,Firstname,Lastname,email,userRole,userRef) VALUES ('` + username + `','` + firstname + `','` + lastname + `','` + email + `','` + userRole + `','` + userRef + `')`, function (err, result, fields) {
            if (err) throw err;
            // GetResAuth(res, result, fields);
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create User"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        db.query(`INSERT INTO user (username,password) VALUES ('` + username + `','` + password + `')`, function (err, result, fields) {
                              if (result.affectedRows > 0) {
                                    res.json({
                                          ResponseCode: "Success",
                                          ResponseData: { username, firstname, lastname, email, userRole }
                                    });
                              }

                        });
                  }

            }

      });
});

app.post('/userManageMent', (req, res) => {

      var username = req.body.username;
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (userRole == 'admin') {
                  db.query("SELECT * FROM user_details", function (err, result, fields) {
                        if (err) throw err;
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            } else {
                  db.query("SELECT * FROM user_details WHERE userRef = '" + username + "'", function (err, result, fields) {
                        if (err) throw err;
                        // GetResAuth(res, result, fields);
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            }

      });
});
app.post('/createCustomer', (req, res) => {
      var customerName = req.body.customerName;
      var customerAddress = req.body.customerAddress;
      var customerMobile = req.body.customerMobile;
      var customerEmail = req.body.customerEmail;
      var customerOfUser = req.body.customerOfUser;
      ConnectDB();
      db.query(`INSERT INTO customer (customerName,customerTel,customerAddress,customerEmail,customerOfUser) VALUES ('` + customerName + `','` + customerMobile + `','` + customerAddress + `','` + customerEmail + `','` + customerOfUser + `')`, function (err, result, fields) {
            if (err) throw err;
            // GetResAuth(res, result, fields);
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Customer"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        db.query("SELECT * FROM customer WHERE customerTel = '" + customerMobile + "' AND customerOfUser = '" + customerOfUser + "'", function (err, result, fields) {
                              if (err) throw err;
                              res.json({
                                    ResponseCode: "Success",
                                    ResponseData: result
                              });
                        });
                  }
            }
      });
});


app.post('/order', (req, res) => {
      var username = req.body.username;
      var product = req.body.product;


      ConnectDB();


      db.query("SELECT * FROM `order`", function (err, result, fields) {
            if (err) {
                  res.json({
                        ResponseCode: "Error",
                        ResponseData: err
                  })
            }
            var date = moment().tz("Asia/Bangkok").format('DDMMYYYY');
            if (result.length > 0) {
                  var orderNoOld = result[result.length - 1].orderNo.split('-')[1];
                  var orderNo = "ORDER-" + date + (Number.parseInt(orderNoOld.substring(8)) + 1).toString();

            } else {
                  var orderNo = "ORDER-" + date + 1
            }


            for (let i in product) {
                  db.query("INSERT INTO `order` (orderNo,productId,quantity,user) VALUES ('" + orderNo + "','" + product[i].productId + "','" + product[i].quantity + "','" + username + "')", function (err, result, fields) {
                        if (err) {
                              res.json({
                                    ResponseCode: "Error",
                                    ResponseData: err
                              })
                        }
                        if (result == [] || result == null || result == 'undefined') {
                              res.json({
                                    ResponseCode: "Error",
                                    ResponseMessage: "Error Create order"
                              });
                        } else {
                              if (result.affectedRows > 0) {
                                    db.query("SELECT quantityItem FROM product WHERE productId = '" + product[i].productId + "'", function (err, result, fields) {
                                          if (err) {
                                                res.json({
                                                      ResponseCode: "Error",
                                                      ResponseData: err
                                                })
                                          }

                                          if (i == product.length - 1) {
                                                res.json({
                                                      ResponseCode: "Success",
                                                      ResponseMessage: { orderNo, product, username }
                                                });
                                          }

                                    });


                              } else {
                                    res.json({
                                          ResponseCode: "Error",
                                          ResponseMessage: {
                                                result
                                          }
                                    });
                              }
                        }
                  });
            }

      });
});
app.post('/orderDetail', (req, res) => {

      var username = req.body.username;
      var orderNo = req.body.orderNo;
      var orderDetail = req.body.orderDetail;
      var payment = req.body.payment;
      var cod = req.body.cod;
      var codCost = req.body.codCost;
      var addCharge = req.body.addCharge;
      var discount = req.body.discount;
      var additionalCost = req.body.additionalCost;
      var shippingFee = req.body.shippingFee;
      var customerId = req.body.customerId;
      var createBy = req.body.createBy;
      var status = "Waiting for shipment"
      ConnectDB();
      let date = moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss');

      db.query(`INSERT INTO order_total (orderNo,totalCharge,addCharge,discount,totalQuantity,grandTotal,customerId,orderDate,user) VALUES ('` + orderNo + `','` + orderDetail.totalCharge + `','` + orderDetail.addCharge + `','` + orderDetail.discount + `','` + orderDetail.totalQuantity + `','` + orderDetail.grandTotal + `','` + customerId + `','` + date + `','` + username + `')`, function (err, result, fields) {
            if (err) {
                  res.json({
                        ResponseCode: "Error",
                        ResponseData: err
                  })
            }

            if (result.affectedRows > 0) {
                  var paymentDate = moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss');
                  db.query(`INSERT INTO payment (orderNo,paymentType,paymentImage,amount,paymentDate,cod,codCost,addCharge,discount,additionalCost,shippingFee,user,status,createBy) VALUES ('` + orderNo + `','` + payment.paymentType + `','` + payment.paymentImage + `','` + payment.amount + `','` + paymentDate + `','` + cod + `','` + codCost + `','` + addCharge + `','` + discount + `','` + additionalCost + `','` + shippingFee + `','` + username + `','` + status + `','` + createBy + `')`, function (err, result, fields) {
                        if (err) {
                              res.json({
                                    ResponseCode: "Error",
                                    ResponseData: err
                              })
                        }

                        if (result.affectedRows > 0) {
                              res.json({
                                    ResponseCode: "Success",
                                    ResponseData: orderNo, orderDetail, payment
                              })
                        }

                  });
            }

      });
});
app.post('/UpdateStatusInvoice', (req, res) => {
      var username = req.body.username;
      var status = req.body.status;
      var orderNo = req.body.orderNo;
      var orderDetail = req.body.orderDetail;
      var detailModify = moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss');

      ConnectDB();
      db.query("UPDATE payment SET status = '" + status + "' WHERE orderNo = '" + orderNo + "'", function (err, result, fields) {
            if (err) {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: err
                  })
            }
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Product"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        if (status == "Paid") {
                              db.query(`INSERT INTO history (orderNo,user,grandTotal,date) VALUES ('` + orderNo + `','` + username + `','` + orderDetail.grandTotal + `','` + detailModify + `')`, function (err, result, fields) {
                                    if (err) {
                                          res.json({
                                                ResponseCode: "Error",
                                                ResponseData: err
                                          })
                                    }

                                    if (result.affectedRows > 0) {
                                          for (let i in orderDetail.order) {
                                                db.query("SELECT quantityItem FROM product WHERE productId = '" + orderDetail.order[i].productId + "'", function (err, result, fields) {
                                                      if (err) {
                                                            res.json({
                                                                  ResponseCode: "Error",
                                                                  ResponseData: err
                                                            })
                                                      }
                                                      var quantityInstock = Number.parseInt(result[0].quantityItem) - Number.parseInt(orderDetail.order[i].quantity);
                                                      // res.json({
                                                      //       ResponseCode: "Success",
                                                      //       ResponseData: {
                                                      //             orderNo, status, username, orderDetail,quantityInstock
                                                      //       }
                                                      // });
                                                      db.query("UPDATE product SET quantityItem = '" + quantityInstock + "' WHERE product.productId = '" + orderDetail.order[i].productId + "'", function (err, resultUpdateQuantity, fields) {
                                                            if (err) {
                                                                  res.json({
                                                                        ResponseCode: "Error",
                                                                        ResponseData: err
                                                                  });
                                                            };
                                                            if (resultUpdateQuantity == [] || resultUpdateQuantity == null || resultUpdateQuantity == 'undefined') {
                                                                  res.json({
                                                                        ResponseCode: "Error",
                                                                        ResponseMessage: "Error Update quantity"
                                                                  });
                                                            }
                                                            if (resultUpdateQuantity.affectedRows > 0) {
                                                                  if (i == orderDetail.order.length - 1) {
                                                                        res.json({
                                                                              ResponseCode: "Success",
                                                                              ResponseData: {
                                                                                    orderNo, status, username, orderDetail, result
                                                                              }
                                                                        });
                                                                  }

                                                            }


                                                      });
                                                });

                                          }

                                    }

                              });
                        } else {
                              res.json({
                                    ResponseCode: "Success",
                                    ResponseData: {
                                          orderNo, status, username
                                    }
                              });
                        }

                  }
            }
      });
});
app.post('/InquiryOrder', (req, res) => {

      var username = req.body.username;
      var orderDetail = [];
      var userRole = '';
      ConnectDB();


      db.query("SELECT * FROM order_total INNER JOIN payment ON payment.orderNo = order_total.orderNo INNER JOIN customer ON order_total.customerId = customer.customerId WHERE order_total.user = '" + username + "' AND payment.status != 'Paid'", function (err, resultOrderDetail, fields) {
            if (err) {
                  res.json({
                        ResponseCode: "Error",
                        ResponseData: err
                  });
            }

            if (resultOrderDetail.length == 0) {
                  res.json({
                        ResponseCode: "Success",
                        ResponseData: { data: resultOrderDetail }
                  });
            } else {
                  for (let i in resultOrderDetail) {
                        resultOrderDetail[i].paymentImage = String.fromCharCode.apply(null, new Uint16Array(resultOrderDetail[i].paymentImage));
                        db.query("SELECT * FROM `order` as o INNER JOIN product ON o.productId = product.productId WHERE orderNo ='" + resultOrderDetail[i].orderNo + "'", function (err, result, fields) {
                              if (err) {
                                    res.json({
                                          ResponseCode: "Error",
                                          ResponseData: err
                                    });
                              }
                              for (var j in result) {


                                    if (result[j].orderNo == resultOrderDetail[i].orderNo) {
                                          orderDetail.push(result[j]);
                                    }

                              }

                              resultOrderDetail[i].order = orderDetail;
                              orderDetail = [];
                              if (i == resultOrderDetail.length - 1) {
                                    res.json({
                                          ResponseCode: "Success",
                                          ResponseData: { data: resultOrderDetail }
                                    });
                              }
                        });

                  }
            }


      });


});
app.post('/ResetPassword', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      ConnectDB();
      db.query("UPDATE user SET password = '" + password + "' WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;

            if (result.affectedRows > 0) {
                  res.json({
                        ResponseCode: "Success",
                        ResponseData: { username, password }
                  });
            }
      });
})
app.post('/GetHistory', (req, res) => {
      var username = req.body.username;
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (userRole == 'admin') {
                  db.query("SELECT * FROM history", function (err, result, fields) {
                        if (err) throw err;
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            } else {
                  db.query("SELECT * FROM history WHERE user = '" + username + "'", function (err, result, fields) {
                        if (err) throw err;
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            }

      });
});
app.post('/SearchCustomer', (req, res) => {
      var username = req.body.username;
      var tel = req.body.tel;
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (userRole == 'admin') {
                  db.query("SELECT * FROM customer WHERE customerTel = '" + tel + "'", function (err, result, fields) {
                        if (err) throw err;
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            } else {
                  db.query("SELECT * FROM customer WHERE customerTel = '" + tel + "' AND customerOfUser = '" + username + "'", function (err, result, fields) {
                        if (err) throw err;
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            }

      });
});

function SetEmptyString(text) {
      if (text == undefined) {
            text = '';
      }
      return text;
}
app.post('/CreateProduct', (req, res) => {
      var username = req.body.username;
      var itemCode = req.body.itemCode;
      var itemName = req.body.itemName;
      var itemStatus = req.body.itemStatus;
      var itemPrice = req.body.itemPrice;
      var userRef = req.body.userRef;
      var quantity = req.body.quantity;
      var detailModify = moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss');

      ConnectDB();
      db.query(`INSERT INTO product (itemCode,itemName,itemStatus,itemPrice,detailModify,user,productInUser,quantityItem) VALUES ('` + itemCode + `','` + itemName + `','` + itemStatus + `','` + itemPrice + `','` + detailModify + `','` + username + `','` + userRef + `','` + quantity + `')`, function (err, result, fields) {
            if (err) throw err;
            // GetResAuth(res, result, fields);
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Product"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: { username, itemCode, itemName, itemStatus, itemPrice, detailModify, userRef }
                        });
                  }
            }
      });
});

app.post('/EditProduct', (req, res) => {
      var username = req.body.username;
      var itemCode = req.body.itemCode;
      var itemName = req.body.itemName;
      var itemStatus = req.body.itemStatus;
      var itemPrice = req.body.itemPrice;
      var userRef = req.body.userRef;
      var productID = req.body.productID;

      var detailModify = moment().tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss');

      ConnectDB();
      db.query("UPDATE product SET itemName = '" + itemName + "',itemCode = '" + itemCode + "',itemStatus ='" + itemStatus + "',itemPrice = '" + itemPrice + "', productInUser ='" + userRef + "' WHERE productID = '" + productID + "'", function (err, result, fields) {
            if (err) throw err;
            // GetResAuth(res, result, fields);
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Product"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: { username, itemCode, itemName, itemStatus, itemPrice, detailModify, userRef }
                        });
                  }
            }
      });
});
app.post('/DeleteUser', (req, res) => {
      var username = req.body.username;
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (userRole == 'admin') {
                  DeleteUser(username, res);
            } else if (userRole == "shop") {
                  db.query("SELECT * FROM payment WHERE user = '" + username + "' AND status != 'Paid'", function (err, result, fields) {
                        if (err) throw err;
                        if (result.length > 0) {
                              res.json({
                                    ResponseCode: "Error",
                                    ResponseMessage: "Cannot Delete " + username + " because this user has invoice that isn't Complete"
                              });
                        } else if (result.length == 0) {
                              DeleteUser(username, res);
                        }
                  });
            } else if (userRole == "cashier") {
                  db.query("SELECT * FROM payment WHERE createBy = '" + username + "' AND status != 'Paid'", function (err, result, fields) {
                        if (err) throw err;
                        if (result.length > 0) {
                              res.json({
                                    ResponseCode: "Error",
                                    ResponseMessage: "Cannot Delete " + username + " because this user has invoice that isn't Complete"
                              });
                        } else if (result.length == 0) {
                              DeleteUser(username, res);
                        }
                  });
            }

      });
});
app.post('/DeleteProduct', (req, res) => {
      var productID = req.body.productID;
      ConnectDB();
      db.query("DELETE FROM product WHERE productID = '" + productID + "'", function (err, result, fields) {
            if (err) throw err;


            // GetResAuth(res, result, fields);
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Product"
                  });
            } else {
                  if (result.affectedRows > 0) {
                        res.json({
                              ResponseCode: "Success",
                              ResponseMessage: productID + " is Deleted"
                        });
                  }
            }
      });
});
app.post('/Report', (req, res) => {

      var username = req.body.username;
      var dateFrom = req.body.dateFrom;
      var dateTo = req.body.dateTo;
      var reportType = req.body.reportType;
      var resultReport = [];

      ConnectDB();

      var username = req.body.username;
      var orderDetail = [];
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (reportType == '1') {
                  if (userRole == 'admin') {
                        db.query("SELECT * FROM order_total INNER JOIN payment ON payment.orderNo = order_total.orderNo INNER JOIN customer ON order_total.customerId = customer.customerId INNER JOIN history ON order_total.orderNo = history.orderNo WHERE payment.status = 'Paid'", function (err, resultOrderDetail, fields) {
                              if (err) {
                                    res.json({
                                          ResponseCode: "Error",
                                          ResponseData: err
                                    });
                              }
                              if (resultOrderDetail.length != 0) {
                                    for (let i in resultOrderDetail) {

                                          db.query("SELECT * FROM `order` INNER JOIN product ON `order`.productId = product.productId WHERE orderNo ='" + resultOrderDetail[i].orderNo + "'", function (err, result, fields) {
                                                var datefromdata = moment(dateFrom, "MMDDYYYY");
                                                var datetodata = moment(dateTo, "MMDDYYYY");

                                                if (err) {
                                                      res.json({
                                                            ResponseCode: "Error",
                                                            ResponseData: err
                                                      });
                                                }
                                                for (var j in result) {

                                                      if (result[j].orderNo == resultOrderDetail[i].orderNo) {
                                                            orderDetail.push(result[j]);
                                                      }

                                                }
                                                resultOrderDetail[i].order = orderDetail;
                                                orderDetail = [];
                                                var dateItem = moment(resultOrderDetail[i].date.split(' ')[0], "DD/MM/YYYY");
                                                if (dateItem >= datefromdata && dateItem <= datetodata) {
                                                      resultReport.push(resultOrderDetail[i]);
                                                }
                                                if (i == resultOrderDetail.length - 1) {
                                                      res.json({
                                                            ResponseCode: "Success",
                                                            ResponseData: { data: resultReport }
                                                      });
                                                }

                                          });

                                    }
                              } else {
                                    res.json({
                                          ResponseCode: "Success",
                                          ResponseData: { resultOrderDetail }
                                    });
                              }
                        });
                  } else {
                        db.query("SELECT * FROM order_total INNER JOIN payment ON payment.orderNo = order_total.orderNo INNER JOIN customer ON order_total.customerId = customer.customerId INNER JOIN history ON order_total.orderNo = history.orderNo WHERE order_total.user = '" + username + "' AND payment.status = 'Paid'", function (err, resultOrderDetail, fields) {
                              if (err) {
                                    res.json({
                                          ResponseCode: "Error",
                                          ResponseData: err
                                    });
                              }
                              if (resultOrderDetail.length != 0) {
                                    for (let i in resultOrderDetail) {

                                          db.query("SELECT * FROM `order` INNER JOIN product ON `order`.productId = product.productId WHERE orderNo ='" + resultOrderDetail[i].orderNo + "'", function (err, result, fields) {
                                                var datefromdata = moment(dateFrom, "MMDDYYYY");
                                                var datetodata = moment(dateTo, "MMDDYYYY");

                                                if (err) {
                                                      res.json({
                                                            ResponseCode: "Error",
                                                            ResponseData: err
                                                      });
                                                }
                                                for (var j in result) {
                                                      if (result[j].orderNo == resultOrderDetail[i].orderNo) {
                                                            orderDetail.push(result[j]);
                                                      }
                                                }
                                                resultOrderDetail[i].order = orderDetail;
                                                orderDetail = [];

                                                var dateItem = moment(resultOrderDetail[i].date.split(' ')[0], "DD/MM/YYYY");
                                                if (dateItem >= datefromdata && dateItem <= datetodata) {
                                                      resultReport.push(resultOrderDetail[i]);
                                                }
                                                if (i == resultOrderDetail.length - 1) {
                                                      res.json({
                                                            ResponseCode: "Success",
                                                            ResponseData: { data: resultReport }
                                                      });
                                                }
                                          });

                                    }
                              } else {
                                    res.json({
                                          ResponseCode: "Success",
                                          ResponseData: { resultOrderDetail }
                                    });
                              }

                        });
                  }
            } else if (reportType == '2') {
                  if (userRole == 'admin') {
                        db.query("SELECT * FROM product", function (err, result, fields) {
                              if (err) throw err;
                              res.json({
                                    ResponseCode: "Success",
                                    ResponseData: { result }
                              });
                        });
                  } else {
                        db.query("SELECT * FROM product WHERE productInUser = '" + username + "'", function (err, result, fields) {
                              if (err) throw err;
                              res.json({
                                    ResponseCode: "Success",
                                    ResponseData: { result }
                              });
                        });
                  }
            }
      });
});
app.post('/InquiryProduct', (req, res) => {

      var username = req.body.username;
      var userRole = '';
      ConnectDB();
      db.query("SELECT * FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
            if (err) throw err;
            userRole = result[0].userRole;
            if (userRole == 'admin') {
                  db.query("SELECT * FROM product", function (err, result, fields) {
                        if (err) throw err;
                        // GetResAuth(res, result, fields);
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            } else {
                  db.query("SELECT * FROM product WHERE productInUser = '" + username + "'", function (err, result, fields) {
                        if (err) throw err;
                        // GetResAuth(res, result, fields);
                        res.json({
                              ResponseCode: "Success",
                              ResponseData: result
                        });
                  });
            }


      });
});

function DeleteUser(username, res) {
      db.query("DELETE FROM user WHERE username = '" + username + "'", function (err, result, fields) {
            if (err)
                  throw err;
            if (result == [] || result == null || result == 'undefined') {
                  res.json({
                        ResponseCode: "Error",
                        ResponseMessage: "Error Create Product"
                  });
            }
            else {
                  if (result.affectedRows > 0) {
                        db.query("DELETE FROM user_details WHERE username = '" + username + "'", function (err, result, fields) {
                              if (err)
                                    throw err;
                              if (result == [] || result == null || result == 'undefined') {
                                    res.json({
                                          ResponseCode: "Error",
                                          ResponseMessage: "Error Create Product"
                                    });
                              }
                              else {
                                    if (result.affectedRows > 0) {
                                          res.json({
                                                ResponseCode: "Success",
                                                ResponseMessage: username + " is Deleted"
                                          });
                                    }
                              }
                        });
                  }
            }
      });
}

