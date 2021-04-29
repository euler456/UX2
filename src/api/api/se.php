<?php

    class sqsSession {
        // attributes will be stored in session, but always test incognito
        private $last_visit = 0;
        private $last_visits = Array();

//        private $user_id = 0;
//        private $user_Username;
//        private $user_Email;
//        private $user_Phone;
//        private $user_token;


        private $CustomerID = 0;
        private $username;
        private $email;
        private $phone;
        private $user_token;

//        private $origin;

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
                if($sqsdb->registerUser($this->CustomerID, $username,$postcode, $password, $email, $phone)) {
                    return true;
                } else {
                    return 0;
                }
            } 
            // call the dbobject for SQL
        
        public function isLoggedIn() {
            if($this->CustomerID === 1) {
                return false;
            } else {
                return Array('Hash'=>$this->user_token);
            }
        }
        public function logout() {
            $this->CustomerID = 0;
//            $this->user_privilege = 0;
        }
        public function validate($type, $dirty_string) {
        }
        public function logEvent() {
        }
    }
?>
