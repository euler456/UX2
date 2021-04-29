<?php

    class sqsModel {

        private $dbconn;

        public function __construct() {
//            $dbURI = 'mysql:host=' .$_ENV['HOST'] . ';port=3306;dbname='.$_ENV['DBASE'];
//            $this->dbconn = new PDO($dbURI, $_ENV['USER'], $_ENV['PASS']);

            $dbURI = 'mysql:host=' . 'localhost'.';port=3307;dbname=' . 'proj2';
            $this->dbconn = new PDO($dbURI, 'root', '');
            $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        function checkLogin($u, $p) {
            // Return uid if user/password tendered are correct otherwise 0
            $sql = "SELECT * FROM customer WHERE username = :username";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindParam(':username', $u, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() > 0) {
                $retVal = $stmt->fetch(PDO::FETCH_ASSOC);
                if(strlen($retVal['password']) > 0) {
                    if($retVal['password'] == $p) { // encrypt & decrypt
                        return Array('username'=>$retVal['username'],
                                  'email'=>$retVal['email'],
                                   'phone'=>$retVal['phone'],
                                   'postcode'=>$retVal['postcode']);
                    } else {
                        return false;
                    }
                } else {
                    return Array('username'=>$retVal['username']);
                }
            } else {
                return false;
            }
        }
        function userExists($u) {
            $sql = "SELECT * FROM customer WHERE username = :username";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindParam(':username', $u, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        }
        function registerUser($CustomerID, $username, $password, $email, $phone, $postcode) {
            // Retister user into system, assume validation has happened.
            // return UID created or false if fail
//            $sql = "UPDATE customer SET Username = :Username, Pass = :Pass, Email = :Email, Phone = :Phone=1 WHERE CustomerID = :CustomerID";

//            $lastCustID = $this->dbconn->lastInsertID();

//            $sql = "INSERT INTO customer(CustomerID,Username,Pass,Email,Phone)  VALUES (:CustomerID,:Username,:Pass,:Email, :Phone)";
            $sql = "INSERT INTO customer (username,password,email,phone,postcode)  VALUES (:username,:password,:email, :phone,:postcode);";
            $stmt = $this->dbconn->prepare($sql);
//            $stmt->bindParam(':CustomerID', $lastCustID, PDO::PARAM_INT);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':phone', $phone, PDO::PARAM_INT);      
            $stmt->bindParam(':postcode', $postcode, PDO::PARAM_INT);             

            $result = $stmt->execute();
            if($result === true) {
                return true;
            } else {
                return false;
            }
        }
        function logEvent($CustomerID, $url, $resp_code, $source_ip) {
            $sql = "INSERT INTO logtable (url, CustomerID, response_code, ip_addr) 
                VALUES (:url, :CustomerID, :resp_code, :ip);";
            $stmt = $this->dbconn->prepare($sql);
            $stmt->bindParam(':CustomerID', $CustomerID, PDO::PARAM_INT);
            $stmt->bindParam(':url', $url, PDO::PARAM_STR);
            $stmt->bindParam(':resp_code', $resp_code, PDO::PARAM_INT);
            $stmt->bindParam(':ip', $source_ip, PDO::PARAM_STR);
            $result = $stmt->execute();
            if($result === true) {
                return true;
            } else {
                return false;
            }
        }
    }
?>
