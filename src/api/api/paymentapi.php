<?php

require_once('./vendor/autoload.php');
require_once('./se.php');
require_once('./paymentfunction.php');

$sqsdb = new sqspayment;



use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Attribute\AttributeBag;
use Symfony\Component\HttpFoundation\Session\Storage\NativeSessionStorage;
use Symfony\Component\HttpFoundation\RedirectResponse;

$request = Request::createFromGlobals();
$response = new Response();
$session = new Session(new NativeSessionStorage(), new AttributeBag());

$response->headers->set('Content-Type', 'application/json');
$response->headers->set('Access-Control-Allow-Headers', 'origin, content-type, accept');
$response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
$response->headers->set('Access-Control-Allow-Origin', 'http://localhost/');
$response->headers->set('Access-Control-Allow-Credentials', 'true');

$session->start();

if(!$session->has('sessionObj')) {
    $session->set('sessionObj', new sqsSession);
}

if(empty($request->query->all())) {
    $response->setStatusCode(400);
} elseif($request->cookies->has('PHPSESSID')) {
    if($session->get('sessionObj')->is_rate_limited()) {
        $response->setStatusCode(429);
    }
    if($request->getMethod() == 'POST') {             // register
        if($request->query->getAlpha('action') =='checkout') {    
           $res = $session->get('sessionObj')->checkout(
            $request->request->get('cname'),
                $request->request->get('ccnum'),
                $request->request->get('expmonth'),    
                $request->request->get('expyear'),
                $request->request->get('cvv')
            );
             if($res === true) {
                 $response->setStatusCode(201);
             } elseif($res === false) {
                 $response->setStatusCode(403);
             } elseif($res === 0) {
                 $response->setStatusCode(500);
             }
            }
    
        elseif($request->query->getAlpha('action') == 'checkoutupdate') {
            $res = $session->get('sessionObj')->checkoutupdate( $request->request->get('orderID'));
    }
   
        else{
            $response->setStatusCode(400);
        }
    }
    if($request->getMethod() == 'DELETE') {           // delete queue, delete comment
        $response->setStatusCode(400);
    }
    if($request->getMethod() == 'PUT') {              // enqueue, add comment
        $response->setStatusCode(400);
    }
    if($request->getMethod() == 'GET') {      
        if($request->query->getAlpha('action') == 'confirmorderform') {
                $res = $session->get('sessionObj')->confirmorderform();
    
        }
       
        else {
            $response->setStatusCode(418);
        }
    }

}
 else {
    $redirect = new RedirectResponse($_SERVER['REQUEST_URI']);
}

// Do logging just before sending response?

$response->send();

?>