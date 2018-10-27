<?php
/**
 * Created by PhpStorm.
 * User: arnaudbanvillet
 * Date: 27/10/2018
 * Time: 10:18
 */

namespace App\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use App\Entity\Permanence;
use App\Entity\Composter;

class PermanenceComtroller extends BaseAdminController
{

    public function createNewPermanenceEntity()
    {
        $permanence = new Permanence();

        // Default date
        $permanence->setDate( new \DateTime('next saturday 11:30') );

        // Default composter
        $composter = $this->getDoctrine()
            ->getRepository(Composter::class)
            ->find( 1 );

        $permanence->setComposter( $composter );

        return $permanence;
    }
}