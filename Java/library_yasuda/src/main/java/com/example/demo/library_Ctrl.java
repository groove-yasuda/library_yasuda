package com.example.demo;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

//vueとの接続用
@CrossOrigin(origins = "http://localhost:8082")
@RestController
public class library_Ctrl {

	library_Model model = new library_Model();

	//初期画面表示
	@GetMapping("/")
	public ModelAndView home() {
		//変数宣言
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		return mv;
	}

	//図書カード番号存在チェック
	@RequestMapping(value = "/numberCheck", method = RequestMethod.POST)
	@ResponseBody
	public boolean no_Exist_Check(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
		//変数宣言
		int libraryNumber = form.getLibraryNumberOver();
		boolean result = true;

		//図書カード番号存在チェック
		int judge = model.existenceCheck(libraryNumber);
		System.out.println("OK");

		//図書カード番号存在チェックの結果によって処理を振り分ける
		if (judge == 0) {
			result = false;
		}

		return result;

	}

	//利用者情報の取得
	@RequestMapping(value = "/dataAcquisition", method = RequestMethod.POST)
	@ResponseBody
	public List data_Acquisition(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
		//変数宣言
		int libraryNumber = form.getLibraryNumberOver();

		//利用者情報の検索
		List judge = model.userSearch(libraryNumber);
		


		return judge;

	}
	
	//都道府県情報取得
	@RequestMapping(value = "/prefectureAcquisition", method = RequestMethod.POST)
	@ResponseBody
	public List prefecture_Acquisition(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
	
		//都道府県IDと名称の取得
		List prefecture = model.getPrefecture();

		return prefecture;

	}


	//利用者情報更新
	@RequestMapping(value = "/dataUpdate", method = RequestMethod.POST)
	@ResponseBody
	public boolean data_Update(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
		
		//変数宣言
		int libraryNumber = form.getLibraryNumberOver();
		String userNameOver = form.getUserNameOver();
		String phoneNumberOver = form.getPhoneNumberOver();
		int prefectureIdOver = form.getPrefectureIdOver();
		String municipalitiesOver = form.getMunicipalitiesOver();
		String streetAddressOver = form.getStreetAddressOver();
		String apartmentOver = form.getApartmentOver();
		
		System.out.println("OK");
		
		boolean result = true;
		
		int judge = model.existenceCheck(libraryNumber);
		
		if (judge == 0) {
			result = false;
		} else {
		//利用者情報をDBに更新
		model.userUpdate(libraryNumber,userNameOver,phoneNumberOver,prefectureIdOver,
				municipalitiesOver,streetAddressOver,apartmentOver);
		System.out.println("OK");
		}

		return result;
	}
	
	//利用者情報削除
	@RequestMapping(value = "/dataDelete", method = RequestMethod.POST)
	@ResponseBody
	public boolean data_Delete(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
		
		//変数宣言
		int libraryNumber = form.getLibraryNumberOver();
		
		System.out.println("OK");
		
		boolean result = true;
		
		model.userDelete(libraryNumber);
		
		int judge = model.existenceCheck(libraryNumber);
		
		if (judge != 0) {
			result = false;
			} 
		System.out.println("OK");
		

		return result;
	}
	//利用者情報削除
	@RequestMapping(value = "/postCodeSearch", method = RequestMethod.POST)
	@ResponseBody
	public String postCode_Search(@RequestBody library_Param form)
			throws ClassNotFoundException, SQLException, IOException {
		
		//変数宣言
		int postCode = form.getPostCodeOver(); 
		
		System.out.println(postCode);
		
		
		String result = model.postSearch(postCode);
		
		return result;
		

	}


}
