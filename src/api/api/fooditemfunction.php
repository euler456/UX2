<?php
 class sqsfood {

    private $dbconn;

    public function __construct() {
//            $dbURI = 'mysql:host=' .$_ENV['HOST'] . ';port=3306;dbname='.$_ENV['DBASE'];
//            $this->dbconn = new PDO($dbURI, $_ENV['USER'], $_ENV['PASS']);

        $dbURI = 'mysql:host=' . 'localhost'.';port=3307;dbname=' . 'proj2';
        $this->dbconn = new PDO($dbURI, 'root', '');
        $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function displayfood(){
        /*$dbhost = 'localhost:3307';
        $dbuser = 'root';
        $dbpass = '';
        $db     = 'proj2';*/

        $sql = "SELECT * FROM food";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->execute();
        //$conn  = mysqli_connect($dbhost,$dbuser,'',$db);
        $result = $stmt->fetchAll();
        //$sql=mysqli_query($conn,"SELECT * FROM food");
        //$result=mysqli_fetch_all($sql,MYSQLI_ASSOC);

exit(json_encode($result));
      
    }
    function addfooditem($foodname, $price, $description,$options,$image) {
      
        $sql = "INSERT INTO food (foodname,price,description,options,image)  VALUES (:foodname,:price,:description,:options,:image);";
        $stmt = $this->dbconn->prepare($sql);
      //  $stmt->bindParam(':F_ID', $F_ID, PDO::PARAM_INT);   
        $stmt->bindParam(':foodname', $foodname, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_INT);    
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);   
        $stmt->bindParam(':options', $options, PDO::PARAM_STR);  
        $stmt->bindParam(':image', $image, PDO::PARAM_STR);  
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }
    function deletefood($F_ID){
        $sql = "DELETE FROM food where F_ID = :F_ID;";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindParam(':F_ID', $F_ID, PDO::PARAM_INT);
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }
    function updatefooditem($F_ID,$foodname, $price, $description,$options,$image) {
      
        $sql = "UPDATE food SET foodname = :foodname,price = :price , description = :description, options = :options, image = :image WHERE F_ID = :F_ID";
        $stmt = $this->dbconn->prepare($sql);
        $stmt->bindParam(':F_ID', $F_ID, PDO::PARAM_INT);   
        $stmt->bindParam(':foodname', $foodname, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_INT);    
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);   
        $stmt->bindParam(':options', $options, PDO::PARAM_STR);  
        $stmt->bindParam(':image', $image, PDO::PARAM_STR);  
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }
    function createorderform($CustomerID) {
        $sql = "INSERT INTO orderform (orderstatus,CustomerID,totalprice)  VALUES ('Notpayed',:CustomerID,'0');";
        $stmt = $this->dbconn->prepare($sql);  
       // $stmt->bindParam(':orderstatus', $orderstatus, PDO::PARAM_STR);
        $stmt->bindParam(':CustomerID', $CustomerID, PDO::PARAM_INT);    
       // $stmt->bindParam(':totalprice', $totalprice, PDO::PARAM_INT);   
        $result = $stmt->execute();
        if($result === true) {
            return true;
        } else {
            return false;
        }
    }


}

  
?>
