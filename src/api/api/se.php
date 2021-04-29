<?php

    class sqsSession {
        //========================userfunction============================
        private $last_visit = 0;
        private $last_visits = Array();
        private $CustomerID = 0;
        private $username;
        private $email;
        private $phone;
        private $user_token;

        public function __construct() {
            $this->origin = 'http://localhost/';
        }
        public function is_rate_limited() {
            if($this->last_visit == 0) {
                $this->last_visit = time();
                return false;
            }
            if($this->last_visit == time()) {
                return true;
            }
            return false;
        }
        public function login($username, $password) {
            global $sqsdb;

            $res = $sqsdb->checkLogin($username, $password);
            if($res === false) {
                return false;
            } elseif(count($res) > 1) {
                $this->CustomerID = $res['CustomerID'];
                $this->user_token = md5(json_encode($res));
                return Array('username'=>$res['username'],
                'email'=>$res['email'],
                'phone'=>$res['phone'],
                'Hash'=>$this->user_token);
            } elseif(count($res) == 1) {
                $this->CustomerID = $res['CustomerID'];
                $this->user_token = md5(json_encode($res));
                return Array('Hash'=>$this->user_token);
            }
        }
        public function register($username, $email, $phone,$postcode,$password, $csrf) {
            global $sqsdb;
                if($sqsdb->registerUser($this->CustomerID, $username,  $email, $phone,$postcode, $password)) {
                    return true;
                } else {
                    return 0;
                }
            }
            public function update($username, $email, $phone,$postcode,$password) {
                global $sqsdb;
                    if($sqsdb->updateprofile($this->CustomerID, $username,  $email, $phone,$postcode, $password)) {
                        return true;
                    } else {
                        return 0;
                    }
                }  
        public function isLoggedIn() {
            if($this->CustomerID === 0) {
                return false;
            } else {
                return Array('Hash'=>$this->user_token);
            }
        }
        public function logout() {
            $this->CustomerID = 0;
        }
        public function validate($type, $dirty_string) {
        }
        public function logEvent() {
        }

    //===========================productfunction================================================
    public function display() {
        global $sqsdb;
        $sqsdb->displayfood();
        return $sqsdb;
    }    
    public function addfood($foodname,$price, $description,$options,$image) {
        global $sqsdb;
            if($sqsdb->addfooditem($foodname,$price,$description,$options,$image)) {
                return true;
            } else {
                return false;
            }
        }
    public function deleteFOOD($F_ID) {
            global $sqsdb;
                if($sqsdb->deletefood($F_ID)) {
                    return true;
                } else {
                    return false;
                }
            }
    public function updatefood($F_ID,$foodname,$price, $description,$options,$image) {
            global $sqsdb;
                    if($sqsdb->updatefooditem($F_ID,$foodname,$price,$description,$options,$image)) {
                        return true;
                    } else {
                        return false;
                    }
                }
    public function createorder($orderstatus,$totalprice) {
                    global $sqsdb;
                        if($sqsdb->createorderform( $orderstatus,$this->CustomerID,$totalprice)) {
                            return true;
                        } else {
                            return 0;
                        }
                    }
    //====================orderfunction===============================
    public function displayorder() {
        global $sqsdb;
        $sqsdb->displayorderfood();
        return $sqsdb;
    }    
    public function orderquantity($F_ID,$foodname,$price,$quantity,$totalprice,$orderID) {
        global $sqsdb;
            if($sqsdb->orderquantityfood($F_ID,$foodname,$price,$quantity,$totalprice,$orderID)) {
                return true;
            } else {
                return false;
            }
        }
    public function showorderform($orderID) {
            global $sqsdb;
            $sqsdb->displayshoworderform($orderID);
            return $sqsdb;
        }
    public function orderdelete($orderitem_ID) {
            global $sqsdb;
                if($sqsdb->deleteorderfood($orderitem_ID)) {
                    return true;
                } else {
                    return false;
                }
            }
    public function orderID() {
                global $sqsdb;
                $sqsdb->getorderID($this->CustomerID);
                return $sqsdb;
            }      
  //====================paymentfunction===============================
  public function confirmorderform() {
    global $sqsdb;
    $sqsdb->getconfirmorderform($this->CustomerID);
    return $sqsdb;
}   
public function sumtotalprice($orderID) {
    global $sqsdb;
    $sqsdb->sumtotalpriceff($orderID);
    return $sqsdb;
} 
public function checkout($cname,$ccnum,$expmonth,$expyear,$cvv) {
    global $sqsdb;
    if($sqsdb->checkoutff($this->CustomerID,$cname,$ccnum,$expmonth,$expyear,$cvv)) {
        return true;
    } else {
        return false;
    }
}    
public function checkoutupdate($orderID) {
    global $sqsdb;
    $sqsdb->checkoutupdateff($orderID);
    return $sqsdb;
} 
}
?>
