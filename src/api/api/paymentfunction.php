<?php
 class sqspayment {

    private $dbconn;

    public function __construct() {
//            $dbURI = 'mysql:host=' .$_ENV['HOST'] . ';port=3306;dbname='.$_ENV['DBASE'];
//            $this->dbconn = new PDO($dbURI, $_ENV['USER'], $_ENV['PASS']);

        $dbURI = 'mysql:host=' . 'localhost'.';port=3307;dbname=' . 'proj2';
        $this->dbconn = new PDO($dbURI, 'root', '');
        $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    function orderquantityfood($F_ID,$foodname,$price,$quantity,$totalprice,$orderID) {
      
        $sql = "INSERT INTO orderitem (F_ID,foodname,price,quantity,totalprice,orderID)  VALUES (:F_ID,:foodname,:price,:quantity,:totalprice,:orderID);";
        $stmt = $this->dbconn->prepare($sql);
      //  $stmt->bindParam(':F_ID', $F_ID, PDO::PARAM_INT);  
      $stmt->bindParam(':F_ID', $F_ID, PDO::PARAM_INT);   
        $stmt->bindParam(':foodname', $foodname, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_INT);   
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);   
        $stmt->bindParam(':totalprice', $totalprice, PDO::PARAM_INT);   
        $stmt->bindParam(':orderID', $orderID, PDO::PARAM_INT);    
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }
    public function getconfirmorderform($CustomerID){
        $sql = "SELECT * FROM orderform where orderID=(SELECT max(orderID) FROM orderform where CustomerID=:CustomerID)";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindParam(':CustomerID', $CustomerID, PDO::PARAM_INT);   
        $stmt->execute();
        $result = $stmt->fetchAll();
        exit(json_encode($result));
    }
    function checkoutff($CustomerID,$cname,$ccnum,$expmonth,$expyear,$cvv) {
      
        $sql = "INSERT INTO payment (CustomerID,cname,ccnum,expmonth,expyear,cvv)  VALUES (:CustomerID,:cname,:ccnum,:expmonth,:expyear,:cvv);";
        $stmt = $this->dbconn->prepare($sql);
      $stmt->bindParam(':CustomerID', $CustomerID, PDO::PARAM_INT);   
        $stmt->bindParam(':cname', $cname, PDO::PARAM_STR);
        $stmt->bindParam(':ccnum', $ccnum, PDO::PARAM_INT);   
        $stmt->bindParam(':expmonth', $expmonth, PDO::PARAM_STR);   
        $stmt->bindParam(':expyear', $expyear, PDO::PARAM_INT);   
        $stmt->bindParam(':cvv', $cvv, PDO::PARAM_INT);    
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }
    

public function checkoutupdateff($orderID){
    $sql = "UPDATE orderform SET orderform.orderstatus = 'completepayment' WHERE orderform.orderID= :orderID;";
    $stmt = $this->dbconn->prepare($sql);
    $stmt->bindParam(':orderID', $orderID, PDO::PARAM_INT);   
    $stmt->execute();
    if($result === true) {
        return true;
    } else {
        return false;
    }
}
}
  
?>
