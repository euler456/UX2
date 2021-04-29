<?php

require_once('./vendor/autoload.php');
require_once('./db.php');
require_once('./se.php');

$sqsdb = new sqsModel;

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
        if($request->query->getAlpha('action') == 'register') {
            if($request->request->has('username')) {
                $res = $sqsdb->userExists($request->request->get('username'));
                if($res) {
                    $response->setStatusCode(418);
                } else {
                    if($request->request->has('username') and
                    $request->request->has('email') and
                    $request->request->has('phone') and
                    $request->request->has('password2') and
                    $request->request->has('postcode') and
                    $request->request->has('password') ) {
                    $res = $session->get('sessionObj')->register(
                        $request->request->getAlpha('username'),
                        $request->request->get('email'),
                        $request->request->get('phone'),
                        $request->request->get('password'), 
                        $request->request->get('postcode'),    
                       $request->request->get('csrf')
                    );
                    if($res === true) {
                        $response->setStatusCode(201);
                    } elseif($res === false) {
                        $response->setStatusCode(403);
                    } elseif($res === 0) {
                        $response->setStatusCode(500);
                    }
                }
                }
            }
           else {
                $response->setStatusCode(400);
            }
        } elseif($request->query->getAlpha('action') == 'login') {
            if($request->request->has('username') and $request->request->has('password'))
             {
                $res = $session->get('sessionObj')->login($request->request->get('username'),
                    $request->request->get('password'));
                if ($res === false) {
                    $response->setContent(json_encode($request->request));                     
                    $response->setStatusCode(401);
                } elseif(count($res) == 1) {
                    $response->setStatusCode(203);
                    $response->setContent(json_encode($res));
                } elseif(count($res) > 1) {
                    $response->setStatusCode(200);
                    $response->setContent(json_encode($res));
                }
            } else {
                $response->setContent(json_encode($request));                
                $response->setStatusCode(404);
            }
        } else {
            $response->setStatusCode(400);
        }
    }
    if($request->getMethod() == 'GET') {              // showqueu, accountexists
        if($request->query->getAlpha('action') == 'accountexists') {
            if($request->query->has('username')) {
                $res = $sqsdb->userExists($request->query->get('username'));
                if($res) {
                    $response->setStatusCode(400);
                } else {
                    $response->setStatusCode(204);
                }
            }
        } elseif($request->query->getAlpha('action') == 'isloggedin') {
            $res = $session->get('sessionObj')->isLoggedIn();
            if($res == false) {
                $response->setStatusCode(403);
            } elseif(count($res) == 1) {
                $response->setStatusCode(200);
                $response->setContent(json_encode($res));
            }
        } elseif($request->query->getAlpha('action') == 'logout') {
            $session->get('sessionObj')->logout();
            $response->setStatusCode(200);
        } else {
            $response->setStatusCode(400);
        }
    }
    if($request->getMethod() == 'DELETE') {           // delete queue, delete comment
        $response->setStatusCode(400);
    }
    if($request->getMethod() == 'PUT') {              // enqueue, add comment
        $response->setStatusCode(400);
    }
} else {
    $redirect = new RedirectResponse($_SERVER['REQUEST_URI']);
}

// Do logging just before sending response?

$response->send();

?>
