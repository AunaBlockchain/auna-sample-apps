from flask import Blueprint
from src.controllers.controller import *


router = Blueprint('router', __name__)

router.route('/',                 methods=['GET' ])(root)
router.route('/api/allowance',    methods=['GET' ])(allowance)
router.route('/api/balanceOf',    methods=['GET' ])(balanceOf)
router.route('/api/totalSupply',  methods=['GET' ])(totalSupply)

router.route('/echo',             methods=['POST'])(echo)
router.route('/ping',             methods=['POST'])(ping)
router.route('/api/approve',      methods=['POST'])(approve)
router.route('/api/transfer',     methods=['POST'])(transfer)
router.route('/api/transferFrom', methods=['POST'])(transferFrom)