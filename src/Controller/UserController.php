<?php
/**
 * Created by PhpStorm.
 * User: arnaudbanvillet
 * Date: 13/10/2018
 * Time: 14:53
 */

namespace App\Controller;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;



class UserController extends BaseAdminController
{
    private $encoder;

    public function __construct( UserPasswordEncoderInterface $encoder )
    {

        $this->encoder = $encoder;
    }

    public function persistUserEntity( User $user )
    {

        $encoded = $this->encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($encoded);
        parent::persistEntity($user);
    }


    public function updateUserEntity( User $user )
    {

        $encoded = $this->encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($encoded);

        parent::updateEntity( $user );
    }

}